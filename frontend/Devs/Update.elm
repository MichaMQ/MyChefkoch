module Devs.Update exposing (..)

import Devs.Ports as Ports

import List.Extra as List
import UUID
import Random
import Debug

import Devs.Objects as O
import Devs.TypeObject exposing (..)
import Devs.Recipe as RecipeObj
import Devs.Utils as DU

-- Update
update : Msg -> O.Model -> ( O.Model, Cmd Msg )
update msg model =
    case msg of
        NoOp -> ( model , Cmd.none )
        Initialize initData ->
          let
            sp = model.sp
            newSp = {sp | serverHost = initData.serverName ++ ":" ++ (String.fromInt initData.serverPort), serverProtokoll = initData.protocol ++ "://"}
            newModel = { model | random = initData.random, sp = newSp }
          in
            ( newModel , Cmd.batch [
              DU.getTagtypeListForOverview newModel
              , DU.getAllUnits newModel
              , DU.getAllSources newModel
              , DU.getAllTags newModel
              , DU.getAllParts newModel
            ] )
        ImageSelected -> ( model , Ports.fileSelected "recImage")
        ImageRead imagePortData ->
          let
            newImage =
              { contents = imagePortData.contents
              , filename = imagePortData.filename
              }
          in
            ( { model | recImage = Just newImage, selectedRecipe = (RecipeObj.setImage model.selectedRecipe (Just imagePortData.filename)) }, DU.uploadImage model newImage )
        GetLoginForm -> ( { model | session = Just O.getEmptySession } , Cmd.none)
        SetUsernameForCheck val -> ( { model | usernameForCheck = val } , Cmd.none)
        SetPasswortForCheck val -> ( { model | passwordForCheck = val } , Cmd.none)
        Login ->
            if String.isEmpty model.passwordForCheck then
                ( { model | alertMessage = Just "Bitte gib einen Passwort ein!" }, Cmd.none )
            else
              if String.isEmpty model.usernameForCheck then
                ( { model | alertMessage = Just "Bitte gib einen Benutzername ein!" }, Cmd.none )
              else
                ( model, DU.login model )
        HandleLogin (Ok session) ->
          case session.account of
            Just account -> if String.length account.token > 0 then ( { model | alertMessage = Nothing, session = Just session } , Cmd.none )
              else ( { model | alertMessage = Just "Mindestens eine der eingegeben Daten ist falsch!" }, Cmd.none )
            Nothing -> case session.stateCode of
              Just error -> ( { model | recAlertMessage = Just (DU.httpErrorToMessage error session.msg), session = Nothing }, Cmd.none)
              Nothing -> (model, Cmd.none)
        HandleLogin (Err error) -> ( { model | recAlertMessage = Just (DU.httpErrorToMessage error Nothing), session = Nothing }, Cmd.none)
        ShowOverView -> ( { model | selectedRecipe = Nothing, selectedTag = Nothing }, Cmd.none )
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
            ( model, DU.getRecipe model selectedRecipe )
        SetNumberForDisplay nfd -> ( { model | selectedRecipe = Maybe.andThen (\recipe -> Just {recipe|number_for_display=String.toFloat nfd}) model.selectedRecipe}, Cmd.none )
        EditRecipe -> ( { model | selectedRecipe = model.selectedRecipe }, Cmd.none )
        InsertRecipe ->
          let
            ( newUuid, newSeed ) = Random.step UUID.generator (DU.getSeed model)
            newRec = O.getEmptyRecipe
          in
            ( { model | currentSeed = Just newSeed, selectedRecipe = Just {newRec | uuid = UUID.toString newUuid} }, Cmd.none )
        SaveRecipe ->
          let
            errorMsg = Maybe.andThen (\rec -> DU.validateRecipe rec) model.selectedRecipe
            _ = Debug.log "selectedRecipe: " model.selectedRecipe
            _ = Debug.log "errorMsg: " errorMsg
          in
            case errorMsg of
              Just msg1 -> ( { model | recAlertMessage = Just msg1 }, Cmd.none )
              Nothing -> case model.selectedRecipe of
                Just newRecipe -> ( model, DU.saveRecipe model newRecipe )
                Nothing -> ( model, Cmd.none )
        SavedRecipe (Ok savedRecipe) -> ( { model | selectedRecipe = Just savedRecipe, recAlertMessage = Nothing }, Cmd.none )
        SavedRecipe (Err error) ->
          let
            _ = Debug.log "error: " error
          in
            ( { model | recAlertMessage = Just (DU.httpErrorToMessage error Nothing) }, Cmd.none)
        DeleteRecipe -> ( { model | deleteRecipe = False, selectedTag = Nothing, recipesOfSelectedTag = Nothing, selectedRecipe = Nothing, newSource = Nothing }, Cmd.none )
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
        SetSource sUuid ->
          let
            sourceList = case model.kl.sourceList of
              Just srcList -> srcList
              Nothing -> []
            newRec = case ( List.find ( \item -> item.uuid == sUuid ) sourceList ) of
              Just src -> (RecipeObj.setSource model.selectedRecipe src)
              Nothing -> model.selectedRecipe
          in
            ( { model | selectedRecipe = newRec } , Cmd.none)
        AddNewSource ->
          let
            ( newUuid, newSeed ) = Random.step UUID.generator (DU.getSeed model)
            emptySource = O.getEmptySource
          in
            ( { model | currentSeed = Just newSeed, newSource = Just { emptySource | uuid = UUID.toString newUuid } }, Cmd.none)
        SetSrcName val -> ( { model | newSource = (RecipeObj.setSourceName model.newSource val) }, Cmd.none)
        SetSrcIsbn val -> ( { model | newSource = (RecipeObj.setSourceIsbn model.newSource val) }, Cmd.none)
        SetSrcYear val -> ( { model | newSource = (RecipeObj.setSourceYear model.newSource val) }, Cmd.none)
        CancelSourceEdit -> ( { model | newSource = Nothing }, Cmd.none)
        SaveNewSource ->
          let
            newSource = case model.newSource of
              Just src -> src
              Nothing -> O.getEmptySource
          in
            if String.isEmpty newSource.name
              then ( { model | alertMessage = Just "Bitte mindestens einen Namen für die Quelle eingeben." }, Cmd.none)
              else ( model, DU.saveSource model newSource)
        SavedSource (Ok savedSource) ->
          let
            newSourceList = case model.kl.sourceList of
              Just srcList -> (List.append srcList [savedSource])
              Nothing -> [savedSource]
          in
            ( { model | newSource = Nothing, kl = (DU.setInitialSource model.kl newSourceList) } , Cmd.none)
        SavedSource (Err error) -> ( { model | alertMessage = Just (DU.httpErrorToMessage error Nothing) }, Cmd.none)
        ChooseNewTag -> ( { model | addTag = Just O.getEmptyTag } , Cmd.none)
        SetChoosenTag tUuid ->
          let
            tagList = case model.kl.tagList of
              Just tagListTmp -> tagListTmp
              Nothing -> []
            newModel = case ( List.find ( \item -> item.uuid == tUuid ) tagList ) of
              Just item -> { model | addTag = Just item }
              Nothing -> model
          in
            ( newModel , Cmd.none)
        RemoveTagFromRec tUuid ->
          let
            newTagList = case model.selectedRecipe of
              Just rec -> List.filter (\item -> (item.uuid /= tUuid)) rec.tags
              Nothing -> []
          in
            ( { model | selectedRecipe = (RecipeObj.setTags model.selectedRecipe newTagList) } , Cmd.none)
        AddTagToRecipe ->
          case model.addTag of
            Just newTag -> ( { model | addTag = Nothing, alertMessage = Nothing, selectedRecipe = (RecipeObj.addToTags model.selectedRecipe newTag) } , Cmd.none)
            Nothing -> ( { model | alertMessage = Just "Bitte einen Tag auswählen." }, Cmd.none)
        CancelAddTag ->
          ( { model | addTag = Nothing, alertMessage = Nothing } , Cmd.none)
        AddIngreToRecipe ->
          let
            ( newUuid, newSeed ) = Random.step UUID.generator (DU.getSeed model)
            newIngre = DU.getNewIngre model newUuid
          in
            ( { model | currentSeed = Just newSeed, selectedRecipe = (RecipeObj.addToIngredients model.selectedRecipe newIngre) } , Cmd.none)
        SetIngreOrder iUuid val ->
          let
            newOrder = Maybe.withDefault 0 <| String.toInt val
            newIngreList = case model.selectedRecipe of
              Just rec -> List.updateIf (\item -> item.uuid == iUuid) (\item -> {item | sortorder = newOrder}) rec.ingredients
              Nothing -> []
          in
            ( { model | selectedRecipe = (RecipeObj.setIngredients model.selectedRecipe newIngreList) } , Cmd.none)
        SetIngreName iUuid val ->
          let
            newIngreList = case model.selectedRecipe of
              Just rec -> List.updateIf (\item -> item.uuid == iUuid) (\item -> {item | name = val}) rec.ingredients
              Nothing -> []
          in
            ( { model | selectedRecipe = (RecipeObj.setIngredients model.selectedRecipe newIngreList) } , Cmd.none)
        SetIngreComment iUuid val ->
          let
            newIngreList = case model.selectedRecipe of
              Just rec -> List.updateIf (\item -> item.uuid == iUuid) (\item -> {item | comment = Just val}) rec.ingredients
              Nothing -> []
          in
            ( { model | selectedRecipe = (RecipeObj.setIngredients model.selectedRecipe newIngreList) } , Cmd.none)
        SetIngreQuant iUuid val ->
          let
            newQuant = Maybe.withDefault 0 <| String.toFloat val
            newIngreList = case model.selectedRecipe of
              Just rec -> List.updateIf (\item -> item.uuid == iUuid) (\item -> {item | quantity = Just newQuant}) rec.ingredients
              Nothing -> []
          in
            ( { model | selectedRecipe = (RecipeObj.setIngredients model.selectedRecipe newIngreList) } , Cmd.none)
        SetIngrePart iUuid pUuid ->
          let
            partKeyList = case model.kl.partList of
              Just list -> list
              Nothing -> []
            newRec = Maybe.andThen (\part -> Maybe.andThen (\rec-> RecipeObj.setIngredients (Just rec) (List.updateIf (\item -> item.uuid == iUuid) (\item -> {item | part = Just part}) rec.ingredients)) (RecipeObj.setParts model.selectedRecipe part)) ( List.find ( \part -> part.uuid == pUuid ) partKeyList )
          in
            ( { model | selectedRecipe = newRec } , Cmd.none)
        SetIngreUnit iUuid uUuid ->
          let
            unitList = case model.kl.unitList of
              Just list -> list
              Nothing -> []
            newIngreList = case ( List.find ( \unit -> unit.uuid == uUuid ) unitList ) of
              Just unit -> case model.selectedRecipe of
                Just rec -> List.updateIf (\item -> item.uuid == iUuid) (\item -> {item | unit = Just unit}) rec.ingredients
                Nothing -> []
              Nothing -> []
          in
            ( { model | selectedRecipe = (RecipeObj.setIngredients model.selectedRecipe newIngreList) } , Cmd.none)
        AddTodoToRecipe ->
          let
            ( newUuid, newSeed ) = Random.step UUID.generator (DU.getSeed model)
          in
            ( { model | currentSeed = Just newSeed, selectedRecipe = (RecipeObj.addToTodos model.selectedRecipe (DU.getNewTodo model newUuid)) } , Cmd.none)
        SetTodoNr tUuid val ->
          let
            newNr = Maybe.withDefault 0 <| String.toInt val
            newTodoList = case model.selectedRecipe of
              Just rec -> List.updateIf (\item -> item.uuid == tUuid) (\item -> {item | number = newNr}) rec.todos
              Nothing -> []
          in
            ( { model | selectedRecipe = (RecipeObj.setTodos model.selectedRecipe newTodoList) } , Cmd.none)
        SetTodoText tUuid val ->
          let
            newTodoList = case model.selectedRecipe of
              Just rec -> List.updateIf (\item -> item.uuid == tUuid) (\item -> {item | text = val}) rec.todos
              Nothing -> []
          in
            ( { model | selectedRecipe = (RecipeObj.setTodos model.selectedRecipe newTodoList) } , Cmd.none)
        SetTodoImg tUuid val ->
          let
            newTodoList = case model.selectedRecipe of
              Just rec -> List.updateIf (\item -> item.uuid == tUuid) (\item -> {item | image = Just val}) rec.todos
              Nothing -> []
          in
            ( { model | selectedRecipe = (RecipeObj.setTodos model.selectedRecipe newTodoList) } , Cmd.none)
        SetTodoImgComment tUuid val ->
          let
            newTodoList = case model.selectedRecipe of
              Just rec -> List.updateIf (\item -> item.uuid == tUuid) (\item -> {item | image_comment = Just val}) rec.todos
              Nothing -> []
          in
            ( { model | selectedRecipe = (RecipeObj.setTodos model.selectedRecipe newTodoList) } , Cmd.none)
        CancelRecipeEdit ->
          ( { model | newSource = Nothing, recAlertMessage = Nothing }, Cmd.none )
        ConfirmDelete ->
          ( { model | deleteRecipe = True }, Cmd.none )
        CancelDelete ->
          ( { model | deleteRecipe = False }, Cmd.none )
        CancelLogin ->
          ( { model | session = Nothing, alertMessage = Nothing }, Cmd.none )
        ShowRecipesOfTag tag ->
          ( { model | selectedTag = tag }, DU.getRecipeListForTag model tag )
        RemoveSelectedTag ->
          ( { model | searchValue = "", selectedTag = Nothing, recipesOfSelectedTag = Nothing }, Cmd.none )
        RemoveSelectedRecipe ->
          ( { model | selectedRecipe = Nothing }, Cmd.none )
        CloseAlert ->
          ( { model | alertMessage = Nothing, recAlertMessage = Nothing }, Cmd.none )
        CloseLoginAlert ->
          ( { model | alertMessage = Nothing }, Cmd.none )
        ListTagtypes (Ok tagtypeList) ->
          ( { model | tagtypeList = Just tagtypeList } , Cmd.none)
        ListTagtypes (Err error) ->
          ( { model | alertMessage = Just (DU.httpErrorToMessage error Nothing) }, Cmd.none)
        ListRecipesForTag (Ok recipeList) ->
          ( { model | recipesOfSelectedTag = Just recipeList } , Cmd.none)
        ListRecipesForTag (Err error) ->
          ( { model | alertMessage = Just (DU.httpErrorToMessage error Nothing) }, Cmd.none)
        SetSearchInput value ->
          ( { model | searchValue = value }, Cmd.none )
        SearchRecipe ->
            if String.isEmpty model.searchValue then
                ( { model | alertMessage = Just "Bitte gib einen Suchbegriff ein!" }, Cmd.none )
            else
                ( { model | selectedTag = Nothing, selectedRecipe = Nothing, recipesOfSelectedTag = Nothing } , DU.searchRecipe model )
        SetRecipe (Ok recipe) ->
          let
              number_for_display = case recipe.number of
                Just n -> toFloat n
                Nothing -> 1
          in
            ( { model | selectedRecipe = Just {recipe|number_for_display=Just number_for_display} } , Cmd.none)
        SetRecipe (Err error) ->
          ( { model | alertMessage = Just (DU.httpErrorToMessage error Nothing) }, Cmd.none)
        SetUnitList (Ok list) ->
          ( { model | kl = (DU.setInitialUnit model.kl list) } , Cmd.none)
        SetUnitList (Err error) ->
          ( { model | alertMessage = Just (DU.httpErrorToMessage error Nothing) }, Cmd.none)
        SetSourceList (Ok list) ->
          ( { model | kl = (DU.setInitialSource model.kl list) } , Cmd.none)
        SetSourceList (Err error) ->
          ( { model | alertMessage = Just (DU.httpErrorToMessage error Nothing) }, Cmd.none)
        SetTagList (Ok list) ->
          ( { model | kl = (DU.setInitialTag model.kl list) } , Cmd.none)
        SetTagList (Err error) ->
          ( { model | alertMessage = Just (DU.httpErrorToMessage error Nothing) }, Cmd.none)
        SetPartList (Ok list) ->
          ( { model | kl = (DU.setInitialPart model.kl list) } , Cmd.none)
        SetPartList (Err error) ->
          ( { model | alertMessage = Just (DU.httpErrorToMessage error Nothing) }, Cmd.none)
        UploadImage (Ok _) ->
          ( model, Cmd.none)
        UploadImage (Err error) ->
          ( { model | alertMessage = Just (DU.httpErrorToMessage error Nothing) }, Cmd.none)
        AddIncredient ingredient recipeId -> (model, DU.addIngredient model ingredient recipeId)
        UpdateIncredient ingredient -> (model, DU.updateIncredient model ingredient)
        RemoveEmptyIngretient ingredientUuid ->
          let
            newRec = case model.selectedRecipe of
              Just rec -> Just { rec | ingredients = (List.filter (\item -> (item.uuid /= ingredientUuid)) rec.ingredients) }
              Nothing -> model.selectedRecipe
          in
            ( { model | selectedRecipe = newRec } , Cmd.none)
        DeleteIncredient ingredient -> (model, DU.deleteIngredient model ingredient)
        DeleteSource sourceId -> (model, DU.deleteSource model sourceId)
        DeleteTag tagId -> (model, DU.deleteTag model tagId)
        AddTodo todo recipeId -> (model, DU.addTodo model todo recipeId)
        UpdateTodo todo -> (model, DU.updateTodo model todo)
        RemoveEmptyTodo todoUuid ->
          let
            newRec = case model.selectedRecipe of
              Just rec -> Just { rec | todos = (List.filter (\item -> (item.uuid /= todoUuid)) rec.todos) }
              Nothing -> model.selectedRecipe
          in
            ( { model | selectedRecipe = newRec } , Cmd.none)
        DeleteTodo todo -> (model, DU.deleteTodo model todo)
        UpdateIncredientResp (Ok _) -> ( model , Cmd.none)
        UpdateIncredientResp (Err error) ->
          ( { model | alertMessage = Just (DU.httpErrorToMessage error Nothing) }, Cmd.none)
        RemoveIngreFromRecipe ingredientUuid (Ok _) ->
          let
            newRec = case model.selectedRecipe of
              Just rec -> Just { rec | ingredients = (List.filter (\item -> (item.uuid /= ingredientUuid)) rec.ingredients) }
              Nothing -> model.selectedRecipe
          in
            ( { model | selectedRecipe = newRec } , Cmd.none)
        RemoveIngreFromRecipe _ (Err error) ->
          ( { model | alertMessage = Just (DU.httpErrorToMessage error Nothing) }, Cmd.none)
        AddIngreToRecipeResp (Ok ingre) ->
          let
            newRec = case model.selectedRecipe of
              Just rec -> Just { rec | ingredients = List.updateIf (\item -> item.uuid == ingre.uuid) (\_ -> ingre) rec.ingredients }
              Nothing -> model.selectedRecipe
          in
            ( { model | selectedRecipe = newRec } , Cmd.none)
        AddIngreToRecipeResp (Err error) ->
          ( { model | alertMessage = Just (DU.httpErrorToMessage error Nothing) }, Cmd.none)
        UpdateTodoResp (Ok _) -> ( model , Cmd.none)
        UpdateTodoResp (Err error) ->
          ( { model | alertMessage = Just (DU.httpErrorToMessage error Nothing) }, Cmd.none)
        RemoveTodoFromRecipe tUuid (Ok _) ->
          let
            newRec = case model.selectedRecipe of
              Just rec -> Just { rec | todos = (List.filter (\item -> (item.uuid /= tUuid)) rec.todos) }
              Nothing -> model.selectedRecipe
          in
            ( { model | selectedRecipe = newRec } , Cmd.none)
        RemoveTodoFromRecipe _ (Err error) ->
          ( { model | alertMessage = Just (DU.httpErrorToMessage error Nothing) }, Cmd.none)
        AddTodoToRecipeResp (Ok todo) ->
          let
            newRec = case model.selectedRecipe of
              Just rec -> Just { rec | todos = List.updateIf (\item -> item.uuid == todo.uuid) (\_ -> todo) rec.todos }
              Nothing -> model.selectedRecipe
          in
            ( { model | selectedRecipe = newRec } , Cmd.none)
        AddTodoToRecipeResp (Err error) ->
          ( { model | alertMessage = Just (DU.httpErrorToMessage error Nothing) }, Cmd.none)
        DeleteSourceResp sourceId (Ok _) ->
          ( model , Cmd.none)
        DeleteSourceResp _ (Err error) ->
          ( { model | alertMessage = Just (DU.httpErrorToMessage error Nothing) }, Cmd.none)
        DeleteTagResp tagId (Ok isDeleted) ->
          ( model , Cmd.none)
        DeleteTagResp _ (Err error) ->
          ( { model | alertMessage = Just (DU.httpErrorToMessage error Nothing) }, Cmd.none)
        
