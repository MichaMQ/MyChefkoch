module Devs.Update exposing (..)

import Devs.Ports as Ports exposing (fileSelected)

import List exposing (..)
import List.Extra as ListE
import Http
import UUID exposing (UUID)
--import Debug exposing (log)

import Devs.Objects as O exposing (..)
import Devs.TypeObject as TO exposing (..)
import Devs.Recipe as RecipeObj
import Devs.BackendApi as Api

-- Update
update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp -> ( model , Cmd.none )
        Initialize initData -> ( { model | random = initData.random } , Cmd.none )
        ImageSelected -> ( model , Ports.fileSelected "recImage")
        ImageRead imagePortData ->
          let
            newImage =
              { contents = imagePortData.contents
              , filename = imagePortData.filename
              }
          in
            ( { model | recImage = Just newImage, selectedRecipe = (RecipeObj.setImage model.selectedRecipe (Just imagePortData.filename)) }, uploadImage model newImage )
        GetLoginForm -> ( { model | loginToken = Just "" } , Cmd.none)
        SetUsernameForCheck val -> ( { model | usernameForCheck = val } , Cmd.none)
        SetPasswortForCheck val -> ( { model | passwordForCheck = val } , Cmd.none)
        Login ->
            if String.isEmpty model.passwordForCheck then
                ( { model | subAlertMessage = Just "Bitte gib einen Passwort ein!" }, Cmd.none )
            else
              if String.isEmpty model.usernameForCheck then
                ( { model | subAlertMessage = Just "Bitte gib einen Benutzername ein!" }, Cmd.none )
              else
                ( model, login model )
        HandleLogin (Ok loginToken) ->
            if String.length loginToken > 0 then
              ( { model | subAlertMessage = Nothing, loginToken = Just loginToken } , Cmd.none )
            else ( { model | subAlertMessage = Just "Mindestens eine der eingegeben Daten ist falsch!" }, Cmd.none )
        HandleLogin (Err error) ->
          ( { model | recAlertMessage = Just (httpErrorToMessage error) }, Cmd.none)
        ShowOverView ->
          ( { model | selectedRecipe = Nothing, selectedTag = Nothing }, Cmd.none )
        ToggleEditForm formEnum ->
          let
            fe = if formEnum == O.None then Nothing else Just formEnum
          in
            ( { model | showEditForm = fe }, Cmd.none)
        ShowRecipe rec ->
          let
            selectedRecipe = case rec of
              Just recipe -> recipe
              Nothing -> {id = -1, name = "", uuid=UUID.toString UUID.nil}
          in
            ( model, getRecipe model selectedRecipe )
        EditRecipe ->
          ( { model | selectedRecipe = model.selectedRecipe }, Cmd.none )
        InsertRecipe ->
          ( { model | selectedRecipe = Just O.getEmptyRecipe }, Cmd.none )
        SaveRecipe ->
          let
            errorMsg = case model.selectedRecipe of
              Just rec -> validateRecipe rec
              Nothing -> Nothing
          in
            case errorMsg of
              Just msg1 -> ( { model | recAlertMessage = Just msg1 }, Cmd.none )
              Nothing -> case model.selectedRecipe of
                Just newRecipe -> ( model, saveRecipe model newRecipe )
                Nothing -> ( model, Cmd.none )
        SavedRecipe (Ok savedRecipe) ->
          ( { model | selectedRecipe = Just savedRecipe, recAlertMessage = Nothing }, Cmd.none )
        SavedRecipe (Err error) ->
          ( { model | recAlertMessage = Just (httpErrorToMessage error) }, Cmd.none)
        DeleteRecipe ->
          ( { model | deleteRecipe = False, selectedTag = Nothing, recipesOfSelectedTag = Nothing, selectedRecipe = Nothing, newSource = Nothing }, Cmd.none )
        CloseRecipeAlert -> ( { model | recAlertMessage = Nothing }, Cmd.none )
        SetAikz val ->           ( { model | selectedRecipe = (RecipeObj.setAikz model.selectedRecipe val) } , Cmd.none)
        SetName val ->           ( { model | selectedRecipe = (RecipeObj.setName model.selectedRecipe val) } , Cmd.none)
        SetTranslate val ->      ( { model | selectedRecipe = (RecipeObj.setTranslate model.selectedRecipe val) } , Cmd.none)
        SetNumber val ->         ( { model | selectedRecipe = (RecipeObj.setNumber model.selectedRecipe val) } , Cmd.none)
        SetNumberComment val ->  ( { model | selectedRecipe = (RecipeObj.setNumberComment model.selectedRecipe val) } , Cmd.none)
        SetRecImage val ->  ( { model | selectedRecipe = (RecipeObj.setImage model.selectedRecipe (Just val)) } , Cmd.none)
        RemoveImageFromRecipe ->  ( { model | recImage = Nothing, selectedRecipe = (RecipeObj.setImage model.selectedRecipe Nothing) } , Cmd.none)
        SetCarbo val ->          ( { model | selectedRecipe = (RecipeObj.setCarbo model.selectedRecipe val) } , Cmd.none)
        SetEnergy val ->         ( { model | selectedRecipe = (RecipeObj.setEnergy model.selectedRecipe val) } , Cmd.none)
        SetFat val ->            ( { model | selectedRecipe = (RecipeObj.setFat model.selectedRecipe val) } , Cmd.none)
        SetProt val ->           ( { model | selectedRecipe = (RecipeObj.setProt model.selectedRecipe val) } , Cmd.none)
        SetSize val ->           ( { model | selectedRecipe = (RecipeObj.setSize model.selectedRecipe val) } , Cmd.none)
        SetSourcePage val ->     ( { model | selectedRecipe = (RecipeObj.setSourcePage model.selectedRecipe val) } , Cmd.none)
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
              Nothing -> O.getEmptySource
          in
            ( { model | selectedRecipe = (RecipeObj.setSource model.selectedRecipe selectedSrc) } , Cmd.none)
        AddNewSource -> ( { model | newSource = Just O.getEmptySource }, Cmd.none)
        SetSrcName val -> ( { model | newSource = (RecipeObj.setSourceName model.newSource val) }, Cmd.none)
        SetSrcIsbn val -> ( { model | newSource = (RecipeObj.setSourceIsbn model.newSource val) }, Cmd.none)
        SetSrcYear val -> ( { model | newSource = (RecipeObj.setSourceYear model.newSource val) }, Cmd.none)
        CancelSourceEdit -> ( { model | newSource = Nothing }, Cmd.none)
        SaveNewSource ->
          let
            newSource = case model.newSource of
              Just src -> src
              Nothing -> O.getEmptySource
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
          ( { model | addTag = Just O.getEmptyTag } , Cmd.none)
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
              Nothing -> O.getEmptyTag
          in
            ( { model | addTag = Just selectedTag } , Cmd.none)
        RemoveTagFromRec idx ->
          let
--            _ = Debug.log "idx: " idx
            tagList = case model.selectedRecipe of
              Just rec -> case rec.tags of
                Just list -> list
                Nothing -> []
              Nothing -> []
            newTagList = ListE.removeAt idx tagList
          in
            ( { model | selectedRecipe = (RecipeObj.setTags model.selectedRecipe newTagList) } , Cmd.none)
        AddTagToRecipe ->
          case model.addTag of
            Just newTag -> case newTag.id of
              Just id -> ( { model | addTag = Nothing, subAlertMessage = Nothing, selectedRecipe = (RecipeObj.addToTags model.selectedRecipe newTag) } , Cmd.none)
              Nothing -> ( { model | subAlertMessage = Just "Bitte einen Tag auswählen." }, Cmd.none)
            Nothing -> ( { model | subAlertMessage = Just "Bitte einen Tag auswählen." }, Cmd.none)
        CancelAddTag ->
          ( { model | addTag = Nothing, subAlertMessage = Nothing } , Cmd.none)
        AddIngreToRecipe ->
          let
            ingreList = case model.selectedRecipe of
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
                  Nothing -> O.getEmptyPart
                Nothing -> O.getEmptyPart
              else O.getEmptyPart
          in
            ( { model | selectedRecipe = (RecipeObj.addToIngredients model.selectedRecipe (O.getEmptyIngre newOrder (Just newPart))) } , Cmd.none)
        SetIngreOrder idx val ->
          let
--            _ = Debug.log "idx: " idx
            newOrder = Maybe.withDefault 0 <| String.toInt val
            ingreList = case model.selectedRecipe of
              Just rec -> case rec.ingredients of
                Just list -> list
                Nothing -> []
              Nothing -> []
            ingreForEdit = RecipeObj.setIngreOrder (getIngreForEdit ingreList idx) newOrder
            newIngreList = ListE.updateAt idx (\ingre -> ingreForEdit) ingreList
          in
            ( { model | selectedRecipe = (RecipeObj.setIngredients model.selectedRecipe newIngreList) } , Cmd.none)
        SetIngreName idx val ->
          let
--            _ = Debug.log "idx: " idx
            ingreList = case model.selectedRecipe of
              Just rec -> case rec.ingredients of
                Just list -> list
                Nothing -> []
              Nothing -> []
            ingreForEdit = RecipeObj.setIngreName (getIngreForEdit ingreList idx) val
            newIngreList = ListE.updateAt idx (\ingre -> ingreForEdit) ingreList
          in
            ( { model | selectedRecipe = (RecipeObj.setIngredients model.selectedRecipe newIngreList) } , Cmd.none)
        SetIngreComment idx val ->
          let
--            _ = Debug.log "idx: " idx
            ingreList = case model.selectedRecipe of
              Just rec -> case rec.ingredients of
                Just list -> list
                Nothing -> []
              Nothing -> []
            ingreForEdit = RecipeObj.setIngreComment (getIngreForEdit ingreList idx) val
            newIngreList = ListE.updateAt idx (\ingre -> ingreForEdit) ingreList
          in
            ( { model | selectedRecipe = (RecipeObj.setIngredients model.selectedRecipe newIngreList) } , Cmd.none)
        SetIngreQuant idx val ->
          let
            newQuant = Maybe.withDefault 0 <| String.toFloat val
            ingreList = case model.selectedRecipe of
              Just rec -> case rec.ingredients of
                Just list -> list
                Nothing -> []
              Nothing -> []
            ingreForEdit = RecipeObj.setIngreQuant (getIngreForEdit ingreList idx) newQuant
            newIngreList = ListE.updateAt idx (\ingre -> ingreForEdit) ingreList
          in
            ( { model | selectedRecipe = (RecipeObj.setIngredients model.selectedRecipe newIngreList) } , Cmd.none)
        SetIngrePart idx partId ->
          let
--            _ = Debug.log "idx: " idx
            partList = case model.kl.partList of
              Just list -> list
              Nothing -> []
            selectedPart = case ( ListE.find ( \part -> part.id == partId ) partList ) of
              Just part -> part
              Nothing -> O.getEmptyPart
--            newPart = Maybe.withDefault 0 <| String.toInt val
            ingreList = case model.selectedRecipe of
              Just rec -> case rec.ingredients of
                Just list -> list
                Nothing -> []
              Nothing -> []
            ingreForEdit = RecipeObj.setIngrePart (getIngreForEdit ingreList idx) selectedPart
            newIngreList = ListE.updateAt idx (\ingre -> ingreForEdit) ingreList
          in
            ( { model | selectedRecipe = (RecipeObj.setIngredients model.selectedRecipe newIngreList) } , Cmd.none)
        SetIngreUnit idx unitId ->
          let
--            _ = Debug.log "idx: " idx
            unitList = case model.kl.unitList of
              Just list -> list
              Nothing -> []
            selectedUnit = case ( ListE.find ( \unit -> unit.id == unitId ) unitList ) of
              Just tag -> tag
              Nothing -> O.getEmptyUnit
            ingreList = case model.selectedRecipe of
              Just rec -> case rec.ingredients of
                Just list -> list
                Nothing -> []
              Nothing -> []
            ingreForEdit = RecipeObj.setIngreUnit (getIngreForEdit ingreList idx) selectedUnit
            newIngreList = ListE.updateAt idx (\ingre -> ingreForEdit) ingreList
          in
            ( { model | selectedRecipe = (RecipeObj.setIngredients model.selectedRecipe newIngreList) } , Cmd.none)
        RemoveIngreFromRecipe ->
          let
            ingreList = case model.selectedRecipe of
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
            ( { model | selectedRecipe = (RecipeObj.setIngredients model.selectedRecipe newIngreList) } , Cmd.none)
        AddTodoToRecipe ->
          let
            todoList = case model.selectedRecipe of
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
            ( { model | selectedRecipe = (RecipeObj.addToTodos model.selectedRecipe (O.getEmptyTodo newNumber)) } , Cmd.none)
        SetTodoNr idx val ->
          let
--            _ = Debug.log "idx: " idx
            newNr = Maybe.withDefault 0 <| String.toInt val
            todoList = case model.selectedRecipe of
              Just rec -> case rec.todos of
                Just list -> list
                Nothing -> []
              Nothing -> []
            todoForEdit = RecipeObj.setTodoNr (getTodoForEdit todoList idx) newNr
            newTodoList = ListE.updateAt idx (\todo -> todoForEdit) todoList
          in
            ( { model | selectedRecipe = (RecipeObj.setTodos model.selectedRecipe newTodoList) } , Cmd.none)
        SetTodoText idx val ->
          let
--            _ = Debug.log "idx: " idx
            todoList = case model.selectedRecipe of
              Just rec -> case rec.todos of
                Just list -> list
                Nothing -> []
              Nothing -> []
            todoForEdit = RecipeObj.setTodoText (getTodoForEdit todoList idx) val
            newTodoList = ListE.updateAt idx (\todo -> todoForEdit) todoList
          in
            ( { model | selectedRecipe = (RecipeObj.setTodos model.selectedRecipe newTodoList) } , Cmd.none)
        SetTodoImg idx val ->
          let
--            _ = Debug.log "idx: " idx
            todoList = case model.selectedRecipe of
              Just rec -> case rec.todos of
                Just list -> list
                Nothing -> []
              Nothing -> []
            todoForEdit = RecipeObj.setTodoImg (getTodoForEdit todoList idx) val
            newTodoList = ListE.updateAt idx (\todo -> todoForEdit) todoList
          in
            ( { model | selectedRecipe = (RecipeObj.setTodos model.selectedRecipe newTodoList) } , Cmd.none)
        SetTodoImgComment idx val ->
          let
--            _ = Debug.log "idx: " idx
            todoList = case model.selectedRecipe of
              Just rec -> case rec.todos of
                Just list -> list
                Nothing -> []
              Nothing -> []
            todoForEdit = RecipeObj.setTodoImgComment (getTodoForEdit todoList idx) val
            newTodoList = ListE.updateAt idx (\todo -> todoForEdit) todoList
          in
            ( { model | selectedRecipe = (RecipeObj.setTodos model.selectedRecipe newTodoList) } , Cmd.none)
        RemoveTodoFromRecipe ->
          let
            todoList = case model.selectedRecipe of
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
            ( { model | selectedRecipe = (RecipeObj.setTodos model.selectedRecipe newTodoList) } , Cmd.none)
        CancelRecipeEdit ->
          ( { model | newSource = Nothing, recAlertMessage = Nothing }, Cmd.none )
        ConfirmDelete ->
          ( { model | deleteRecipe = True }, Cmd.none )
        CancelDelete ->
          ( { model | deleteRecipe = False }, Cmd.none )
        CancelLogin ->
          ( { model | loginToken = Nothing, subAlertMessage = Nothing }, Cmd.none )
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
        SetPartList (Ok list) ->
          ( { model | kl = (setInitialPart model.kl list) } , Cmd.none)
        SetPartList (Err error) ->
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
      Nothing -> O.getEmptyIngre 0 Nothing

getTodoForEdit: List Todo -> Int -> Todo
getTodoForEdit list idx =
    case ListE.getAt idx (sortBy .number list) of
      Just todo -> todo
      Nothing -> O.getEmptyTodo 0

setInitialUnit: KeyLists -> List Unit -> KeyLists
setInitialUnit keyList newList = { keyList | unitList = Just newList }

setInitialSource: KeyLists -> List Source -> KeyLists
setInitialSource keyList newList = { keyList | sourceList = Just newList }

setInitialTag: KeyLists -> List Tag -> KeyLists
setInitialTag keyList newList = { keyList | tagList = Just newList }

setInitialPart: KeyLists -> List PartLight -> KeyLists
setInitialPart keyList newList = { keyList | partList = Just newList }

getAllUnits: Model -> Cmd Msg
getAllUnits model = Api.getAllUnits SetUnitList model.loginToken (model.sp.serverProtokoll ++ model.sp.serverHost ++ model.sp.serverUrlPrefix ++ model.sp.apiUrlPrefix ++ "/getAllUnits")

getAllSources: Model -> Cmd Msg
getAllSources model = Api.getAllSources SetSourceList model.loginToken (model.sp.serverProtokoll ++ model.sp.serverHost ++ model.sp.serverUrlPrefix ++ model.sp.apiUrlPrefix ++ "/getAllSources")

getAllTags: Model -> Cmd Msg
getAllTags model = Api.getAllTags SetTagList model.loginToken (model.sp.serverProtokoll ++ model.sp.serverHost ++ model.sp.serverUrlPrefix ++ model.sp.apiUrlPrefix ++ "/getAllTags")

getAllParts: Model -> Cmd Msg
getAllParts model = Api.getAllParts SetPartList model.loginToken (model.sp.serverProtokoll ++ model.sp.serverHost ++ model.sp.serverUrlPrefix ++ model.sp.apiUrlPrefix ++ "/getAllParts")

uploadImage: Model -> ImagePortData -> Cmd Msg
uploadImage model image = Api.uploadImage UploadImage model.loginToken (model.sp.serverProtokoll ++ model.sp.serverHost ++ model.sp.serverUrlPrefix ++ model.sp.apiUrlPrefix ++ "/uploadImage") image

saveSource: Model -> Source -> Cmd Msg
saveSource model newSource = Api.saveSource SavedSource model.loginToken (model.sp.serverProtokoll ++ model.sp.serverHost ++ model.sp.serverUrlPrefix ++ model.sp.apiUrlPrefix ++ "/saveSource") newSource

saveRecipe: Model -> Recipe -> Cmd Msg
saveRecipe model newRecipe = Api.saveRecipe SavedRecipe model.loginToken (model.sp.serverProtokoll ++ model.sp.serverHost ++ model.sp.serverUrlPrefix ++ model.sp.apiUrlPrefix ++ "/saveRecipe") newRecipe

getTagtypeListForOverview : Model -> Cmd Msg
getTagtypeListForOverview model = Api.getTagtypeListForOverview ListTagtypes model.loginToken (model.sp.serverProtokoll ++ model.sp.serverHost ++ model.sp.serverUrlPrefix ++ model.sp.apiUrlPrefix ++ "/getAllTagTypes")

searchRecipe: Model -> Cmd Msg
searchRecipe model = Api.searchRecipe ListRecipesForTag model.loginToken (model.sp.serverProtokoll ++ model.sp.serverHost ++ model.sp.serverUrlPrefix ++ model.sp.apiUrlPrefix ++ "/findRecipeByName/?name=" ++ String.trim model.searchValue)

getRecipe: Model -> RecipeLight -> Cmd Msg
getRecipe model rec = Api.getRecipe SetRecipe model.loginToken (model.sp.serverProtokoll ++ model.sp.serverHost ++ model.sp.serverUrlPrefix ++ model.sp.apiUrlPrefix ++ "/getRecipeById/?id=" ++ String.fromInt rec.id)

login: Model -> Cmd Msg
login model = Api.login HandleLogin (model.sp.serverProtokoll ++ model.sp.serverHost ++ model.sp.serverUrlPrefix ++ model.sp.apiUrlPrefix ++ "/login/?username=" ++ model.usernameForCheck ++ "&password=" ++ model.passwordForCheck)

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
    Api.getRecipeListForTag ListRecipesForTag model.loginToken (model.sp.serverProtokoll ++ model.sp.serverHost ++ model.sp.serverUrlPrefix ++ model.sp.apiUrlPrefix ++ "/getAllRecipeByTagWithoutMeta/?id=" ++ (String.fromInt tagId))

httpErrorToMessage: Http.Error -> String
httpErrorToMessage error =
  case error of
    Http.NetworkError -> "Is the server running?"
    Http.BadStatus response -> String.fromInt response
    Http.BadBody response -> response
--    Http.BadPayload message _ -> "Decoding Failed: " ++ message
    Http.BadUrl url -> "You defindes a wrong URL! " ++ url
    Http.Timeout -> "The time for request is out!"

isLoggedIn: Maybe String -> Bool
isLoggedIn loginToken =
  case loginToken of
    Just log -> if String.length log > 0
      then True
      else False
    Nothing -> False


isNotMember : ( List a, a ) -> Bool
isNotMember a =
  let
    --_ = Debug.log "isNotMember: " a
    isNotMemberVal = ListE.notMember (Tuple.second a) (Tuple.first a)
--    _ = Debug.log "isNotMember: " isNotMemberVal
  in
    isNotMemberVal
