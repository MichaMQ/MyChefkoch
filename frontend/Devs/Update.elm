module Devs.Update exposing (..)

import Devs.Ports as Ports exposing (fileSelected)

import List exposing (..)
import List.Extra as ListE
import Http
import Debug exposing (log)

import Devs.Objects as Objects exposing (..)
import Devs.Recipe as RecipeObj


-- Update
update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp -> ( model , Cmd.none)
        ImageSelected -> ( model , Ports.fileSelected "recImage")
        ImageRead imagePortData ->
          let
            newImage =
              { contents = imagePortData.contents
              , filename = imagePortData.filename
              }
          in
            ( { model | recImage = Just newImage, recipeForEdit = (RecipeObj.setImage model.recipeForEdit (Just imagePortData.filename)) }, uploadImage model newImage )
        GetLoginForm -> ( { model | loggedIn = Just False } , Cmd.none)
        SetPasswortForCheck val -> ( { model | passwordForCheck = val } , Cmd.none)
        Login ->
            if String.isEmpty model.passwordForCheck then
                ( { model | subAlertMessage = Just "Bitte gib einen Passwort ein!" }, Cmd.none )
            else
              if String.trim model.passwordForCheck == model.sp.password then
                ( { model | subAlertMessage = Nothing, loggedIn = Just True } , Cmd.none )
              else ( { model | subAlertMessage = Just "Das eingegbene Passwort ist falsch!" }, Cmd.none )
        ShowOverView ->
          ( { model | selectedRecipe = Nothing, selectedTag = Nothing }, Cmd.none )
        ShowRecipe rec ->
          let
            selectedRecipe = case rec of
              Just recipe -> recipe
              Nothing -> {id = -1, name = ""}
          in
            ( model, getRecipe model selectedRecipe )
        EditRecipe ->
          ( { model | recipeForEdit = model.selectedRecipe }, Cmd.none )
        InsertRecipe ->
          ( { model | recipeForEdit = Just Objects.getEmptyRecipe }, Cmd.none )
        SaveRecipe ->
          let
            errorMsg = case model.recipeForEdit of
              Just rec -> validateRecipe rec
              Nothing -> Nothing
          in
            case errorMsg of
              Just msg1 -> ( { model | recAlertMessage = Just msg1 }, Cmd.none )
              Nothing -> case model.recipeForEdit of
                Just newRecipe -> ( model, saveRecipe model newRecipe )
                Nothing -> ( model, Cmd.none )
        SavedRecipe (Ok savedRecipe) ->
          ( { model | selectedTab = "Tab1", selectedRecipe = Just savedRecipe, recipeForEdit = Nothing, recAlertMessage = Nothing }, Cmd.none )
        SavedRecipe (Err error) ->
          ( { model | recAlertMessage = Just (httpErrorToMessage error) }, Cmd.none)
        DeleteRecipe ->
          ( { model | selectedTab = "Tab1", deleteRecipe = False, selectedTag = Nothing, recipesOfSelectedTag = Nothing, selectedRecipe = Nothing, recipeForEdit = Nothing, newSource = Nothing }, Cmd.none )
        CloseRecipeAlert -> ( { model | recAlertMessage = Nothing }, Cmd.none )
        SetAikz val ->           ( { model | recipeForEdit = (RecipeObj.setAikz model.recipeForEdit val) } , Cmd.none)
        SetName val ->           ( { model | recipeForEdit = (RecipeObj.setName model.recipeForEdit val) } , Cmd.none)
        SetTranslate val ->      ( { model | recipeForEdit = (RecipeObj.setTranslate model.recipeForEdit val) } , Cmd.none)
        SetNumber val ->         ( { model | recipeForEdit = (RecipeObj.setNumber model.recipeForEdit val) } , Cmd.none)
        SetNumberComment val ->  ( { model | recipeForEdit = (RecipeObj.setNumberComment model.recipeForEdit val) } , Cmd.none)
        SetRecImage val ->  ( { model | recipeForEdit = (RecipeObj.setImage model.recipeForEdit (Just val)) } , Cmd.none)
        RemoveImageFromRecipe ->  ( { model | recImage = Nothing, recipeForEdit = (RecipeObj.setImage model.recipeForEdit Nothing) } , Cmd.none)
        SetCarbo val ->          ( { model | recipeForEdit = (RecipeObj.setCarbo model.recipeForEdit val) } , Cmd.none)
        SetEnergy val ->         ( { model | recipeForEdit = (RecipeObj.setEnergy model.recipeForEdit val) } , Cmd.none)
        SetFat val ->            ( { model | recipeForEdit = (RecipeObj.setFat model.recipeForEdit val) } , Cmd.none)
        SetProt val ->           ( { model | recipeForEdit = (RecipeObj.setProt model.recipeForEdit val) } , Cmd.none)
        SetSize val ->           ( { model | recipeForEdit = (RecipeObj.setSize model.recipeForEdit val) } , Cmd.none)
        SetSourcePage val ->     ( { model | recipeForEdit = (RecipeObj.setSourcePage model.recipeForEdit val) } , Cmd.none)
        SetSource val ->
          let
            sourceList = case model.kl.sourceList of
              Just srcList -> srcList
              Nothing -> []
            selectedSrc = case (
                ListE.find (
                  \src ->
                    case src.id of
                      Just id -> id == val
                      Nothing -> False
                ) sourceList
              ) of
              Just src -> src
              Nothing -> Objects.getEmptySource
          in
            ( { model | recipeForEdit = (RecipeObj.setSource model.recipeForEdit selectedSrc) } , Cmd.none)
        AddNewSource -> ( { model | newSource = Just Objects.getEmptySource }, Cmd.none)
        SetSrcName val -> ( { model | newSource = (RecipeObj.setSourceName model.newSource val) }, Cmd.none)
        SetSrcIsbn val -> ( { model | newSource = (RecipeObj.setSourceIsbn model.newSource val) }, Cmd.none)
        SetSrcYear val -> ( { model | newSource = (RecipeObj.setSourceYear model.newSource val) }, Cmd.none)
        CancelSourceEdit -> ( { model | newSource = Nothing }, Cmd.none)
        SaveNewSource ->
          let
            newSource = case model.newSource of
              Just src -> src
              Nothing -> Objects.getEmptySource
            alertMsg = if String.isEmpty newSource.name
              then Just "Bitte mindestens einen Namen für die Quelle eingeben."
              else Nothing
          in
            case alertMsg of
              Just msg2 -> ( { model | subAlertMessage = Just msg2 }, Cmd.none)
              Nothing -> ( model, saveSource model newSource)
        SavedSource (Ok savedSource) ->
          let
            newSourceList = case model.kl.sourceList of
              Just srcList -> (List.append srcList [savedSource])
              Nothing -> [savedSource]
          in
            ( { model | newSource = Nothing, kl = (setInitialSource model.kl newSourceList) } , Cmd.none)
        SavedSource (Err error) ->
          ( { model | subAlertMessage = Just (httpErrorToMessage error) }, Cmd.none)
        ChooseNewTag ->
          ( { model | addTag = Just Objects.getEmptyTag } , Cmd.none)
        SetChoosenTag idVal ->
          let
            tagList = case model.kl.tagList of
              Just tagListTmp -> tagListTmp
              Nothing -> []
            selectedTag = case (
                ListE.find (
                  \tag ->
                    case tag.id of
                      Just id -> id == idVal
                      Nothing -> False
                ) tagList
              ) of
              Just tag -> tag
              Nothing -> Objects.getEmptyTag
          in
            ( { model | addTag = Just selectedTag } , Cmd.none)
        RemoveTagFromRec idx ->
          let
--            _ = Debug.log "idx: " idx
            tagList = case model.recipeForEdit of
              Just rec -> case rec.tags of
                Just list -> list
                Nothing -> []
              Nothing -> []
            newTagList = ListE.removeAt idx tagList
          in
            ( { model | recipeForEdit = (RecipeObj.setTags model.recipeForEdit newTagList) } , Cmd.none)
        AddTagToRecipe ->
          case model.addTag of
            Just newTag -> case newTag.id of
              Just id -> ( { model | addTag = Nothing, subAlertMessage = Nothing, recipeForEdit = (RecipeObj.addToTags model.recipeForEdit newTag) } , Cmd.none)
              Nothing -> ( { model | subAlertMessage = Just "Bitte einen Tag auswählen." }, Cmd.none)
            Nothing -> ( { model | subAlertMessage = Just "Bitte einen Tag auswählen." }, Cmd.none)
        CancelAddTag ->
          ( { model | addTag = Nothing, subAlertMessage = Nothing } , Cmd.none)
        AddIngreToRecipe ->
          let
            ingreList = case model.recipeForEdit of
              Just rec -> case rec.ingredients of
                Just ingre -> List.sortBy .sortorder ingre
                Nothing -> []
              Nothing -> []
            lastIdx = (List.length ingreList) - 1
            newOrder = if lastIdx > -1
              then case (ListE.getAt lastIdx ingreList) of
                Just ingre -> (ingre.sortorder + 1)
                Nothing -> 0
              else 0
            newPart = if lastIdx > -1
              then case (ListE.getAt lastIdx ingreList) of
                Just ingre -> case ingre.part of
                  Just part -> part
                  Nothing -> 0
                Nothing -> 0
              else 0
          in
            ( { model | recipeForEdit = (RecipeObj.addToIngredients model.recipeForEdit (Objects.getEmptyIngre newOrder (Just newPart))) } , Cmd.none)
        SetIngreOrder idx val ->
          let
--            _ = Debug.log "idx: " idx
            newOrder = Maybe.withDefault 0 <| String.toInt val
            ingreList = case model.recipeForEdit of
              Just rec -> case rec.ingredients of
                Just list -> list
                Nothing -> []
              Nothing -> []
            ingreForEdit = RecipeObj.setIngreOrder (getIngreForEdit ingreList idx) newOrder
            newIngreList = ListE.updateAt idx (\ingre -> ingreForEdit) ingreList
          in
            ( { model | recipeForEdit = (RecipeObj.setIngredients model.recipeForEdit newIngreList) } , Cmd.none)
        SetIngreName idx val ->
          let
--            _ = Debug.log "idx: " idx
            ingreList = case model.recipeForEdit of
              Just rec -> case rec.ingredients of
                Just list -> list
                Nothing -> []
              Nothing -> []
            ingreForEdit = RecipeObj.setIngreName (getIngreForEdit ingreList idx) val
            newIngreList = ListE.updateAt idx (\ingre -> ingreForEdit) ingreList
          in
            ( { model | recipeForEdit = (RecipeObj.setIngredients model.recipeForEdit newIngreList) } , Cmd.none)
        SetIngreComment idx val ->
          let
--            _ = Debug.log "idx: " idx
            ingreList = case model.recipeForEdit of
              Just rec -> case rec.ingredients of
                Just list -> list
                Nothing -> []
              Nothing -> []
            ingreForEdit = RecipeObj.setIngreComment (getIngreForEdit ingreList idx) val
            newIngreList = ListE.updateAt idx (\ingre -> ingreForEdit) ingreList
          in
            ( { model | recipeForEdit = (RecipeObj.setIngredients model.recipeForEdit newIngreList) } , Cmd.none)
        SetIngreQuant idx val ->
          let
            newQuant = Maybe.withDefault 0 <| String.toFloat val
            ingreList = case model.recipeForEdit of
              Just rec -> case rec.ingredients of
                Just list -> list
                Nothing -> []
              Nothing -> []
            ingreForEdit = RecipeObj.setIngreQuant (getIngreForEdit ingreList idx) newQuant
            newIngreList = ListE.updateAt idx (\ingre -> ingreForEdit) ingreList
          in
            ( { model | recipeForEdit = (RecipeObj.setIngredients model.recipeForEdit newIngreList) } , Cmd.none)
        SetIngrePart idx val ->
          let
--            _ = Debug.log "idx: " idx
            newPart = Maybe.withDefault 0 <| String.toInt val
            ingreList = case model.recipeForEdit of
              Just rec -> case rec.ingredients of
                Just list -> list
                Nothing -> []
              Nothing -> []
            ingreForEdit = RecipeObj.setIngrePart (getIngreForEdit ingreList idx) newPart
            newIngreList = ListE.updateAt idx (\ingre -> ingreForEdit) ingreList
          in
            ( { model | recipeForEdit = (RecipeObj.setIngredients model.recipeForEdit newIngreList) } , Cmd.none)
        SetIngreUnit idx unitId ->
          let
--            _ = Debug.log "idx: " idx
            unitList = case model.kl.unitList of
              Just list -> list
              Nothing -> []
            selectedUnit = case ( ListE.find ( \unit -> unit.id == unitId ) unitList ) of
              Just tag -> tag
              Nothing -> Objects.getEmptyUnit
            ingreList = case model.recipeForEdit of
              Just rec -> case rec.ingredients of
                Just list -> list
                Nothing -> []
              Nothing -> []
            ingreForEdit = RecipeObj.setIngreUnit (getIngreForEdit ingreList idx) selectedUnit
            newIngreList = ListE.updateAt idx (\ingre -> ingreForEdit) ingreList
          in
            ( { model | recipeForEdit = (RecipeObj.setIngredients model.recipeForEdit newIngreList) } , Cmd.none)
        RemoveIngreFromRecipe ->
          let
            ingreList = case model.recipeForEdit of
              Just rec -> case rec.ingredients of
                Just ingre -> List.sortBy .sortorder ingre
                Nothing -> []
              Nothing -> []
            lastIdx = (List.length ingreList) - 1
            newIngreList = if List.length ingreList > 0
              then ListE.removeAt lastIdx ingreList
              else []
            --_ = Debug.log "lastIdx: " lastIdx
          in
            ( { model | recipeForEdit = (RecipeObj.setIngredients model.recipeForEdit newIngreList) } , Cmd.none)
        AddTodoToRecipe ->
          let
            todoList = case model.recipeForEdit of
              Just rec -> case rec.todos of
                Just todos -> List.sortBy .number todos
                Nothing -> []
              Nothing -> []
            lastIdx = (List.length todoList) - 1
            newNumber = if lastIdx > -1
              then case (ListE.getAt lastIdx todoList) of
                Just todo -> (todo.number + 1)
                Nothing -> 0
              else 0
          in
            ( { model | recipeForEdit = (RecipeObj.addToTodos model.recipeForEdit (Objects.getEmptyTodo newNumber)) } , Cmd.none)
        SetTodoNr idx val ->
          let
--            _ = Debug.log "idx: " idx
            newNr = Maybe.withDefault 0 <| String.toInt val
            todoList = case model.recipeForEdit of
              Just rec -> case rec.todos of
                Just list -> list
                Nothing -> []
              Nothing -> []
            todoForEdit = RecipeObj.setTodoNr (getTodoForEdit todoList idx) newNr
            newTodoList = ListE.updateAt idx (\todo -> todoForEdit) todoList
          in
            ( { model | recipeForEdit = (RecipeObj.setTodos model.recipeForEdit newTodoList) } , Cmd.none)
        SetTodoText idx val ->
          let
--            _ = Debug.log "idx: " idx
            todoList = case model.recipeForEdit of
              Just rec -> case rec.todos of
                Just list -> list
                Nothing -> []
              Nothing -> []
            todoForEdit = RecipeObj.setTodoText (getTodoForEdit todoList idx) val
            newTodoList = ListE.updateAt idx (\todo -> todoForEdit) todoList
          in
            ( { model | recipeForEdit = (RecipeObj.setTodos model.recipeForEdit newTodoList) } , Cmd.none)
        SetTodoImg idx val ->
          let
--            _ = Debug.log "idx: " idx
            todoList = case model.recipeForEdit of
              Just rec -> case rec.todos of
                Just list -> list
                Nothing -> []
              Nothing -> []
            todoForEdit = RecipeObj.setTodoImg (getTodoForEdit todoList idx) val
            newTodoList = ListE.updateAt idx (\todo -> todoForEdit) todoList
          in
            ( { model | recipeForEdit = (RecipeObj.setTodos model.recipeForEdit newTodoList) } , Cmd.none)
        SetTodoImgComment idx val ->
          let
--            _ = Debug.log "idx: " idx
            todoList = case model.recipeForEdit of
              Just rec -> case rec.todos of
                Just list -> list
                Nothing -> []
              Nothing -> []
            todoForEdit = RecipeObj.setTodoImgComment (getTodoForEdit todoList idx) val
            newTodoList = ListE.updateAt idx (\todo -> todoForEdit) todoList
          in
            ( { model | recipeForEdit = (RecipeObj.setTodos model.recipeForEdit newTodoList) } , Cmd.none)
        RemoveTodoFromRecipe ->
          let
            todoList = case model.recipeForEdit of
              Just rec -> case rec.todos of
                Just todos -> List.sortBy .number todos
                Nothing -> []
              Nothing -> []
            lastIdx = (List.length todoList) - 1
            newTodoList = if List.length todoList > 0
              then ListE.removeAt lastIdx todoList
              else []
            --_ = Debug.log "lastIdx: " lastIdx
          in
            ( { model | recipeForEdit = (RecipeObj.setTodos model.recipeForEdit newTodoList) } , Cmd.none)
        ToggleTab tab ->
          ( { model | selectedTab = tab }, Cmd.none )
        CancelRecipeEdit ->
          ( { model | selectedTab = "Tab1", recipeForEdit = Nothing, newSource = Nothing, recAlertMessage = Nothing }, Cmd.none )
        ConfirmDelete ->
          ( { model | deleteRecipe = True }, Cmd.none )
        CancelDelete ->
          ( { model | deleteRecipe = False }, Cmd.none )
        CancelLogin ->
          ( { model | loggedIn = Nothing, subAlertMessage = Nothing }, Cmd.none )
        ShowRecipesOfTag tag ->
          ( { model | selectedTag = tag }, getRecipeListForTag model tag )
        RemoveSelectedTag ->
          ( { model | searchValue = "", selectedTag = Nothing, recipesOfSelectedTag = Nothing }, Cmd.none )
        RemoveSelectedRecipe ->
          ( { model | selectedRecipe = Nothing }, Cmd.none )
        CloseAlert ->
          ( { model | alertMessage = Nothing }, Cmd.none )
        CloseLoginAlert ->
          ( { model | subAlertMessage = Nothing }, Cmd.none )
        ListTagtypes (Ok tagtypeList) ->
          ( { model | tagtypeList = Just tagtypeList } , Cmd.none)
        ListTagtypes (Err error) ->
          ( { model | alertMessage = Just (httpErrorToMessage error) }, Cmd.none)
        ListRecipesForTag (Ok recipeList) ->
          ( { model | recipesOfSelectedTag = Just recipeList } , Cmd.none)
        ListRecipesForTag (Err error) ->
          ( { model | alertMessage = Just (httpErrorToMessage error) }, Cmd.none)
        SetSearchInput value ->
          ( { model | searchValue = value }, Cmd.none )
        SearchRecipe ->
            if String.isEmpty model.searchValue then
                ( { model | alertMessage = Just "Bitte gib einen Suchbegriff ein!" }, Cmd.none )
            else
                ( { model | selectedTag = Nothing, selectedRecipe = Nothing, recipesOfSelectedTag = Nothing } , searchRecipe model )
        SetRecipe (Ok recipe) ->
          ( { model | selectedRecipe = Just recipe } , Cmd.none)
        SetRecipe (Err error) ->
          ( { model | alertMessage = Just (httpErrorToMessage error) }, Cmd.none)
        SetUnitList (Ok list) ->
          ( { model | kl = (setInitialUnit model.kl list) } , Cmd.none)
        SetUnitList (Err error) ->
          ( { model | alertMessage = Just (httpErrorToMessage error) }, Cmd.none)
        SetSourceList (Ok list) ->
          ( { model | kl = (setInitialSource model.kl list) } , Cmd.none)
        SetSourceList (Err error) ->
          ( { model | alertMessage = Just (httpErrorToMessage error) }, Cmd.none)
        SetTagList (Ok list) ->
          ( { model | kl = (setInitialTag model.kl list) } , Cmd.none)
        SetTagList (Err error) ->
          ( { model | alertMessage = Just (httpErrorToMessage error) }, Cmd.none)
        UploadImage (Ok value) ->
          ( model, Cmd.none)
        UploadImage (Err error) ->
          ( { model | subAlertMessage = Just (httpErrorToMessage error) }, Cmd.none)

-- Functions
validateRecipe: Recipe -> Maybe String
validateRecipe rec =
  let
    ingreList = case rec.ingredients of
      Just list -> list
      Nothing -> []
    todoList = case rec.todos of
      Just list -> list
      Nothing -> []
    tagList = case rec.tags of
      Just list -> list
      Nothing -> []
  in
    if String.isEmpty rec.name
      then Just "Es muss ein Namen eingegeben werden."
      else case rec.source of
        Just src -> if List.isEmpty ingreList
          then Just "Es muss mindestens eine Zutat eingegeben werden."
          else if List.isEmpty todoList
            then Just "Es muss mindestens eine Anweisung eingegeben werden."
            else if List.isEmpty tagList
              then Just "Es muss mindestens ein Tag eingegeben werden."
              else Nothing
        Nothing -> Just "Es muss eine Quelle angegeben werden."

getIngreForEdit: List Ingredient -> Int -> Ingredient
getIngreForEdit ingreList idx =
    case ListE.getAt idx (sortBy .sortorder ingreList) of
      Just ingre -> ingre
      Nothing -> Objects.getEmptyIngre 0 (Just 0)

getTodoForEdit: List Todo -> Int -> Todo
getTodoForEdit list idx =
    case ListE.getAt idx (sortBy .number list) of
      Just todo -> todo
      Nothing -> Objects.getEmptyTodo 0

setInitialUnit: KeyLists -> List Unit -> KeyLists
setInitialUnit keyList newList = { keyList | unitList = Just newList }

setInitialSource: KeyLists -> List Source -> KeyLists
setInitialSource keyList newList = { keyList | sourceList = Just newList }

setInitialTag: KeyLists -> List Tag -> KeyLists
setInitialTag keyList newList = { keyList | tagList = Just newList }

getAllUnits: Model -> Cmd Msg
getAllUnits model = RecipeObj.getAllUnits SetUnitList (model.sp.serverProtokoll ++ model.sp.serverHost ++ model.sp.serverUrlPrefix ++ model.sp.apiUrlPrefix ++ "/getAllUnits")

getAllSources: Model -> Cmd Msg
getAllSources model = RecipeObj.getAllSources SetSourceList (model.sp.serverProtokoll ++ model.sp.serverHost ++ model.sp.serverUrlPrefix ++ model.sp.apiUrlPrefix ++ "/getAllSources")

getAllTags: Model -> Cmd Msg
getAllTags model = RecipeObj.getAllTags SetTagList (model.sp.serverProtokoll ++ model.sp.serverHost ++ model.sp.serverUrlPrefix ++ model.sp.apiUrlPrefix ++ "/getAllTags")


uploadImage: Model -> ImagePortData -> Cmd Msg
uploadImage model image = RecipeObj.uploadImage UploadImage (model.sp.serverProtokoll ++ model.sp.serverHost ++ model.sp.serverUrlPrefix ++ model.sp.apiUrlPrefix ++ "/uploadImage") image

saveSource: Model -> Source -> Cmd Msg
saveSource model newSource = RecipeObj.saveSource SavedSource (model.sp.serverProtokoll ++ model.sp.serverHost ++ model.sp.serverUrlPrefix ++ model.sp.apiUrlPrefix ++ "/saveSource") newSource

saveRecipe: Model -> Recipe -> Cmd Msg
saveRecipe model newRecipe = RecipeObj.saveRecipe SavedRecipe (model.sp.serverProtokoll ++ model.sp.serverHost ++ model.sp.serverUrlPrefix ++ model.sp.apiUrlPrefix ++ "/saveRecipe") newRecipe

getTagtypeListForOverview : Model -> Cmd Msg
getTagtypeListForOverview model = RecipeObj.getTagtypeListForOverview ListTagtypes (model.sp.serverProtokoll ++ model.sp.serverHost ++ model.sp.serverUrlPrefix ++ model.sp.apiUrlPrefix ++ "/getAllTagTypes")

searchRecipe: Model -> Cmd Msg
searchRecipe model = RecipeObj.searchRecipe ListRecipesForTag (model.sp.serverProtokoll ++ model.sp.serverHost ++ model.sp.serverUrlPrefix ++ model.sp.apiUrlPrefix ++ "/findRecipeByName/?name=" ++ String.trim model.searchValue)

getRecipe: Model -> RecipeLight -> Cmd Msg
getRecipe model rec = RecipeObj.getRecipe SetRecipe (model.sp.serverProtokoll ++ model.sp.serverHost ++ model.sp.serverUrlPrefix ++ model.sp.apiUrlPrefix ++ "/getRecipeById/?id=" ++ String.fromInt rec.id)

getRecipeListForTag: Model -> Maybe Tag -> Cmd Msg
getRecipeListForTag model selectedTag =
  let
    --_ = Debug.log "Tag: " selectedTag
    tagId = case model.selectedTag of
      Just tag ->
        case tag.id of
          Just id -> id
          Nothing -> -2
      Nothing -> case selectedTag of
        Just tag ->
          case tag.id of
            Just id -> id
            Nothing -> -3
        Nothing -> -4
  in
    RecipeObj.getRecipeListForTag ListRecipesForTag (model.sp.serverProtokoll ++ model.sp.serverHost ++ model.sp.serverUrlPrefix ++ model.sp.apiUrlPrefix ++ "/getAllRecipeByTagWithoutMeta/?id=" ++ (String.fromInt tagId))

httpErrorToMessage: Http.Error -> String
httpErrorToMessage error =
  case error of
    Http.NetworkError -> "Is the server running?"
    Http.BadStatus response -> String.fromInt response
    Http.BadBody response -> response
--    Http.BadPayload message _ -> "Decoding Failed: " ++ message
    Http.BadUrl url -> "You defindes a wrong URL! " ++ url
    Http.Timeout -> "The time for request is out!"

isNotMember : ( List a, a ) -> Bool
isNotMember a =
  let
    --_ = Debug.log "isNotMember: " a
    isNotMemberVal = ListE.notMember (Tuple.second a) (Tuple.first a)
    _ = Debug.log "isNotMember: " isNotMemberVal
  in
    isNotMemberVal
