module Devs.Utils exposing (..)

import List exposing (..)
import List.Extra as ListE
import Http
import Random
import UUID exposing (UUID)

import Devs.Objects as O exposing (..)
import Devs.TypeObject as TO exposing (..)
import Devs.BackendApi as Api

-- Functions
getNewIngre: Model -> UUID -> Ingredient
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

getNewTodo: Model -> UUID -> Todo
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

validateRecipe: Recipe -> Maybe String
validateRecipe rec =
    if String.isEmpty rec.name
      then Just "Es muss ein Namen eingegeben werden."
      else case rec.source of
        Just src -> if List.isEmpty rec.ingredients
          then Just "Es muss mindestens eine Zutat eingegeben werden."
          else if List.isEmpty rec.todos
            then Just "Es muss mindestens eine Anweisung eingegeben werden."
            else if List.isEmpty rec.tags
              then Just "Es muss mindestens ein Tag eingegeben werden."
              else Nothing
        Nothing -> Just "Es muss eine Quelle angegeben werden."

getSeed: Model -> Random.Seed
getSeed model =
  case model.currentSeed of
      Just seed ->  seed
      Nothing -> Random.initialSeed model.random

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
