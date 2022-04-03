module Devs.Utils exposing (..)

import List exposing (..)
import List.Extra as ListE
import Http
import Random
import UUID exposing (UUID)

import Devs.Objects as O
import Devs.TypeObject as TO
import Devs.BackendApi as Api
import Devs.RecipeEncode as RE

-- Functions
getNewIngre: O.Model -> UUID -> O.Ingredient
getNewIngre model newUuid =
  let
    ingreList = case model.selectedRecipe of
      Just rec -> List.sortBy .sortorder rec.ingredients
      Nothing -> []
    newOrder = case ListE.last ingreList of
      Just lastItem -> lastItem.sortorder + 1
      Nothing -> 0
    newPart = case ListE.last ingreList of
      Just lastItem -> lastItem.part
      Nothing -> Just O.getEmptyPart
    newIngre = O.getEmptyIngre newOrder newPart
  in
    { newIngre | uuid = UUID.toString newUuid }

getNewTodo: O.Model -> UUID -> O.Todo
getNewTodo model newUuid =
  let
    todoList = case model.selectedRecipe of
      Just rec -> List.sortBy .number rec.todos
      Nothing -> []
    newNumber = case ListE.last todoList of
      Just lastItem -> lastItem.number + 1
      Nothing -> 0
    newTodo = O.getEmptyTodo newNumber
  in
    { newTodo | uuid = UUID.toString newUuid }

validateRecipe: O.Recipe -> Maybe String
validateRecipe rec =
    if String.isEmpty rec.name
      then Just "Es muss ein Namen eingegeben werden."
      else case rec.source of
        Just _ -> if List.isEmpty rec.ingredients
          then Just "Es muss mindestens eine Zutat eingegeben werden."
          else if List.isEmpty rec.todos
            then Just "Es muss mindestens eine Anweisung eingegeben werden."
            else if List.isEmpty rec.tags
              then Just "Es muss mindestens ein Tag eingegeben werden."
              else Nothing
        Nothing -> Just "Es muss eine Quelle angegeben werden."

getSeed: O.Model -> Random.Seed
getSeed model =
  case model.currentSeed of
      Just seed ->  seed
      Nothing -> Random.initialSeed model.random

getIngreForEdit: List O.Ingredient -> Int -> O.Ingredient
getIngreForEdit ingreList idx =
    case ListE.getAt idx (sortBy .sortorder ingreList) of
      Just ingre -> ingre
      Nothing -> O.getEmptyIngre 0 Nothing

getTodoForEdit: List O.Todo -> Int -> O.Todo
getTodoForEdit list idx =
    case ListE.getAt idx (sortBy .number list) of
      Just todo -> todo
      Nothing -> O.getEmptyTodo 0

setInitialUnit: O.KeyLists -> List O.Unit -> O.KeyLists
setInitialUnit keyList newList = { keyList | unitList = Just newList }

setInitialSource: O.KeyLists -> List O.Source -> O.KeyLists
setInitialSource keyList newList = { keyList | sourceList = Just newList }

setInitialTag: O.KeyLists -> List O.Tag -> O.KeyLists
setInitialTag keyList newList = { keyList | tagList = Just newList }

setInitialPart: O.KeyLists -> List O.PartLight -> O.KeyLists
setInitialPart keyList newList = { keyList | partList = Just newList }

getAllUnits: O.Model -> Cmd TO.Msg
getAllUnits model = Api.getAllUnits TO.SetUnitList model.session (model.sp.serverProtokoll ++ model.sp.serverHost ++ model.sp.serverUrlPrefix ++ model.sp.apiUrlPrefix ++ "/getAllUnits")

getAllSources: O.Model -> Cmd TO.Msg
getAllSources model = Api.getAllSources TO.SetSourceList model.session (model.sp.serverProtokoll ++ model.sp.serverHost ++ model.sp.serverUrlPrefix ++ model.sp.apiUrlPrefix ++ "/getAllSources")

getAllTags: O.Model -> Cmd TO.Msg
getAllTags model = Api.getAllTags TO.SetTagList model.session (model.sp.serverProtokoll ++ model.sp.serverHost ++ model.sp.serverUrlPrefix ++ model.sp.apiUrlPrefix ++ "/getAllTags")

getAllParts: O.Model -> Cmd TO.Msg
getAllParts model = Api.getAllParts TO.SetPartList model.session (model.sp.serverProtokoll ++ model.sp.serverHost ++ model.sp.serverUrlPrefix ++ model.sp.apiUrlPrefix ++ "/getAllParts")

uploadImage: O.Model -> O.ImagePortData -> Cmd TO.Msg
uploadImage model image = Api.uploadImage TO.UploadImage model.session (model.sp.serverProtokoll ++ model.sp.serverHost ++ model.sp.serverUrlPrefix ++ model.sp.apiUrlPrefix ++ "/uploadImage") image

saveSource: O.Model -> O.Source -> Cmd TO.Msg
saveSource model newSource = Api.saveSource TO.SavedSource model.session (model.sp.serverProtokoll ++ model.sp.serverHost ++ model.sp.serverUrlPrefix ++ model.sp.apiUrlPrefix ++ "/saveSource") newSource

saveRecipe: O.Model -> O.Recipe -> Cmd TO.Msg
saveRecipe model newRecipe = Api.saveRecipe TO.SavedRecipe model.session (model.sp.serverProtokoll ++ model.sp.serverHost ++ model.sp.serverUrlPrefix ++ model.sp.apiUrlPrefix ++ "/saveRecipe") newRecipe

addIngredient: O.Model -> O.Ingredient -> Int -> Cmd TO.Msg
addIngredient model ingredient recipeId = Api.addIngredient TO.AddIngreToRecipeResp model.session (model.sp.serverProtokoll ++ model.sp.serverHost ++ model.sp.serverUrlPrefix ++ model.sp.apiUrlPrefix ++ "/addIngredient") (RE.addIncredientEncoder recipeId ingredient)

updateIncredient: O.Model -> O.Ingredient -> Cmd TO.Msg
updateIncredient model ingredient = Api.updateValue TO.UpdateIncredientResp model.session (model.sp.serverProtokoll ++ model.sp.serverHost ++ model.sp.serverUrlPrefix ++ model.sp.apiUrlPrefix ++ "/updateIngredient") (RE.ingreEncoder ingredient)

deleteIngredient: O.Model -> O.Ingredient -> Cmd TO.Msg
deleteIngredient model ingredient = case ingredient.id of
  Just ingredientId -> Api.deleteValue (TO.RemoveIngreFromRecipe ingredient.uuid) model.session (model.sp.serverProtokoll ++ model.sp.serverHost ++ model.sp.serverUrlPrefix ++ model.sp.apiUrlPrefix ++ "/deleteIngredient?ingredientId=" ++ (String.fromInt ingredientId))
  Nothing -> Cmd.none
deleteSource: O.Model -> Int -> Cmd TO.Msg
deleteSource model sourceId = Api.deleteValue (TO.DeleteSourceResp sourceId) model.session (model.sp.serverProtokoll ++ model.sp.serverHost ++ model.sp.serverUrlPrefix ++ model.sp.apiUrlPrefix ++ "/deleteSource?sourceId=" ++ (String.fromInt sourceId))
deleteTag: O.Model -> Int -> Cmd TO.Msg
deleteTag model tagId = Api.deleteValue (TO.DeleteTagResp tagId) model.session (model.sp.serverProtokoll ++ model.sp.serverHost ++ model.sp.serverUrlPrefix ++ model.sp.apiUrlPrefix ++ "/deleteTag?tagId=" ++ (String.fromInt tagId))


addTodo: O.Model -> O.Todo -> Int -> Cmd TO.Msg
addTodo model todo recipeId = Api.addTodo TO.AddTodoToRecipeResp model.session (model.sp.serverProtokoll ++ model.sp.serverHost ++ model.sp.serverUrlPrefix ++ model.sp.apiUrlPrefix ++ "/addTodo") (RE.addTodoEncoder recipeId todo)

updateTodo: O.Model -> O.Todo -> Cmd TO.Msg
updateTodo model todo = Api.updateValue TO.UpdateTodoResp model.session (model.sp.serverProtokoll ++ model.sp.serverHost ++ model.sp.serverUrlPrefix ++ model.sp.apiUrlPrefix ++ "/updateTodo") (RE.todoEncoder todo)

deleteTodo: O.Model -> O.Todo -> Cmd TO.Msg
deleteTodo model todo = case todo.id of
  Just todoId -> Api.deleteValue (TO.RemoveTodoFromRecipe todo.uuid) model.session (model.sp.serverProtokoll ++ model.sp.serverHost ++ model.sp.serverUrlPrefix ++ model.sp.apiUrlPrefix ++ "/deleteTodo?todoId=" ++ (String.fromInt todoId))
  Nothing -> Cmd.none

getTagtypeListForOverview : O.Model -> Cmd TO.Msg
getTagtypeListForOverview model = Api.getTagtypeListForOverview TO.ListTagtypes model.session (model.sp.serverProtokoll ++ model.sp.serverHost ++ model.sp.serverUrlPrefix ++ model.sp.apiUrlPrefix ++ "/getAllTagTypes")

searchRecipe: O.Model -> Cmd TO.Msg
searchRecipe model = Api.searchRecipe TO.ListRecipesForTag model.session (model.sp.serverProtokoll ++ model.sp.serverHost ++ model.sp.serverUrlPrefix ++ model.sp.apiUrlPrefix ++ "/findRecipeByName/?name=" ++ String.trim model.searchValue)

getRecipe: O.Model -> O.RecipeLight -> Cmd TO.Msg
getRecipe model rec = Api.getRecipe TO.SetRecipe model.session (model.sp.serverProtokoll ++ model.sp.serverHost ++ model.sp.serverUrlPrefix ++ model.sp.apiUrlPrefix ++ "/getRecipeById/?id=" ++ String.fromInt rec.id)

login: O.Model -> Cmd TO.Msg
login model = Api.login TO.HandleLogin (model.sp.serverProtokoll ++ model.sp.serverHost ++ model.sp.serverUrlPrefix ++ model.sp.apiUrlPrefix ++ "/login/?username=" ++ model.usernameForCheck ++ "&password=" ++ model.passwordForCheck)

getRecipeListForTag: O.Model -> Maybe O.Tag -> Cmd TO.Msg
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
    Api.getRecipeListForTag TO.ListRecipesForTag model.session (model.sp.serverProtokoll ++ model.sp.serverHost ++ model.sp.serverUrlPrefix ++ model.sp.apiUrlPrefix ++ "/getAllRecipeByTagWithoutMeta/?id=" ++ (String.fromInt tagId))

httpErrorToMessage: Http.Error -> Maybe String -> String
httpErrorToMessage error msg =
    case error of
      Http.NetworkError -> "Is the server running?"
      Http.BadStatus response -> String.fromInt response ++ case msg of
        Just m -> " (" ++ m ++ ")"
        Nothing -> ""
      Http.BadBody response -> response ++ case msg of
        Just m -> " (" ++ m ++ ")"
        Nothing -> ""
  --    Http.BadPayload message _ -> "Decoding Failed: " ++ message
      Http.BadUrl url -> "You defindes a wrong URL! " ++ url
      Http.Timeout -> "The time for request is out!"

isLoggedIn: Maybe O.Session -> Maybe O.Person -> Bool
isLoggedIn session person =
  case session of
    Just log -> 
      let
        loggedPerson = Maybe.withDefault O.getEmptyPerson log.person
        loggedAccount = Maybe.withDefault O.getEmptyAccount log.account
      in
        case person of
          Just pers -> (Maybe.withDefault -1 loggedPerson.id) == (Maybe.withDefault -2 pers.id)
          Nothing -> String.length loggedAccount.token > 0
    Nothing -> False

--isOwnerOfRecipe

isNotMember : ( List a, a ) -> Bool
isNotMember a =
  let
    --_ = Debug.log "isNotMember: " a
    isNotMemberVal = ListE.notMember (Tuple.second a) (Tuple.first a)
--    _ = Debug.log "isNotMember: " isNotMemberVal
  in
    isNotMemberVal
