module Devs.Objects exposing (..)

import Http
--import Video as VideoObj

-- Model
type alias ServerParams = {serverProtokoll: String, serverHost: String, serverUrlPrefix: String, apiUrlPrefix: String, iconPath: String, imagePath: String, password: String}
type alias KeyLists = {sourceList: Maybe (List Source), tagList: Maybe (List Tag), unitList: Maybe (List Unit)}
type alias TagtypeShort = {id: Maybe Int, name: String}
type alias Tag = {id: Maybe Int, name: String, tagtype: TagtypeShort}
type alias Tagtype = {id: Int, name: String, tagList: List Tag}
type alias UnitCategory = {id: Int, name: String}
type alias Unit = {id: Int, name: String, unitCategory: UnitCategory}
type alias Source = {id: Maybe Int, isbn: Maybe String, name: String, year: Maybe String}
type alias Todo = {id: Int, image: Maybe String, image_comment: Maybe String, number: Int, text: String}
type alias Ingredient = {id: Maybe Int, name: String, comment: Maybe String , part: Maybe PartLight, quantity: Maybe Float, sortorder: Int, unit: Maybe Unit}
type alias Part = {id: Int, name: String, ingredients: List Ingredient}
type alias PartLight = {id: Int, name: String}
type alias RecipeLight = {id: Int, name: String}
type alias Recipe = {
  aikz: Int,
  id: Maybe Int,
  image: Maybe String,
--  ingredients: Maybe (List Ingredient),
  parts: Maybe (List Part),
  name: String,
  translate: Maybe String,
  number: Maybe Int,
  number_comment: Maybe String,
  nv_carbohydrates: Maybe Float,
  nv_energy: Maybe Float,
  nv_fat: Maybe Float,
  nv_protein: Maybe Float,
  nv_size: Maybe Int,
  source: Maybe Source,
  source_page: Maybe Int,
  tags: Maybe (List Tag),
  todos: Maybe (List Todo)}
type alias ImagePortData = { contents : String, filename : String }

-- Types
type Msg =
  NoOp |
  ImageSelected |
  ImageRead ImagePortData |
  ShowOverView |
  GetLoginForm |
  SetPasswortForCheck String |
  Login |
  ShowRecipesOfTag (Maybe Tag) |
  ShowRecipe (Maybe RecipeLight) |
  EditRecipe |
  InsertRecipe |
  SaveRecipe |
  SavedRecipe (Result Http.Error (Recipe)) |
  DeleteRecipe |
  SetAikz Int |
  SetName String |
  SetTranslate String |
  SetNumber String |
  SetNumberComment String |
  SetRecImage String |
  RemoveImageFromRecipe |
  SetCarbo String |
  SetEnergy String |
  SetFat String |
  SetProt String |
  SetSize String |
  SetSourcePage String |
  SetSource Int |
  AddNewSource |
  SetSrcName String |
  SetSrcIsbn String |
  SetSrcYear String |
  CancelSourceEdit |
  SaveNewSource |
  SavedSource (Result Http.Error (Source)) |
  ChooseNewTag |
  SetChoosenTag Int |
  RemoveTagFromRec Int |
  CancelAddTag |
  AddTagToRecipe |
{-
  AddIngreToRecipe |
  SetIngreOrder Int String |
  SetIngreName Int String |
  SetIngrePart Int String |
  SetIngreUnit Int Int |
  SetIngreQuant Int String |
  SetIngreComment Int String |
  RemoveIngreFromRecipe |
-}
  AddTodoToRecipe |
  SetTodoNr Int String |
  SetTodoText Int String |
  SetTodoImg Int String |
  SetTodoImgComment Int String |
  RemoveTodoFromRecipe |
  CancelRecipeEdit |
  ConfirmDelete |
  CancelDelete |
  CancelLogin |
  ToggleTab String |
  CloseAlert |
  CloseLoginAlert |
  CloseRecipeAlert |
  RemoveSelectedTag |
  RemoveSelectedRecipe |
  ListTagtypes (Result Http.Error (List Tagtype)) |
  ListRecipesForTag (Result Http.Error (List RecipeLight)) |
  SetRecipe (Result Http.Error Recipe) |
  SetUnitList (Result Http.Error (List Unit)) |
  SetSourceList (Result Http.Error (List Source)) |
  SetTagList (Result Http.Error (List Tag)) |
  SetSearchInput String |
  SearchRecipe |
  UploadImage (Result Http.Error Bool)

type alias Model = {
    sp: ServerParams,
    alertMessage: Maybe String,
    subAlertMessage: Maybe String,
    recAlertMessage: Maybe String,
    searchValue: String,
    tagtypeList: Maybe (List Tagtype),
    selectedTag: Maybe Tag,
    recipesOfSelectedTag: Maybe (List RecipeLight),
    selectedRecipe: Maybe Recipe,
    recipeForEdit: Maybe Recipe,
    recImage: Maybe ImagePortData,
    selectedTab: String,
    newSource: Maybe Source,
    addTag: Maybe Tag,
    kl: KeyLists,
    loggedIn: Maybe Bool,
    deleteRecipe: Bool,
    passwordForCheck: String
  }

-- Model

keyLists: KeyLists
keyLists = {sourceList = Nothing, tagList = Nothing, unitList = Nothing}

--http://horst:8085/RecipeServer/api/v1/getAllTags
serverParams: ServerParams
serverParams = {serverProtokoll = "http://",
    serverHost = "horst:8085",
    serverUrlPrefix = "/RecipeServer",
    apiUrlPrefix = "/api/v1",
    iconPath = "icons/",
    imagePath = "images/",
    password = "xxx"
  }

initialModel: Model
initialModel = {
  sp = serverParams,
  alertMessage = Nothing,
  subAlertMessage = Nothing,
  recAlertMessage = Nothing,
  searchValue = "",
  tagtypeList = Nothing,
  selectedTag = Nothing,
  recipesOfSelectedTag = Nothing,
  selectedRecipe = Nothing,
  recipeForEdit = Nothing,
  recImage = Nothing,
  selectedTab = "Tab1",
  newSource = Nothing,
  addTag = Nothing,
  kl = keyLists,
  loggedIn = Nothing,
--  loggedIn = Just True,
  deleteRecipe = False,
  passwordForCheck = ""
  }

getEmptyTodo: Int -> Todo
getEmptyTodo newNumber = {id=0, image=Nothing, image_comment=Nothing, number=newNumber, text=""}

getEmptyIngre: Int -> Maybe Int -> Ingredient
getEmptyIngre newOrder newPart = {
  id=Nothing,
  name="",
  comment=Nothing ,
  part=Nothing,
  quantity=Nothing,
  sortorder=newOrder,
  unit=Nothing}

getEmptyUnit: Unit
getEmptyUnit = {id=0, name="", unitCategory={id=0, name=""}}

getEmptySource: Source
getEmptySource = {id=Nothing, isbn=Nothing, name="", year=Nothing}

getEmptyTagtype: Tagtype
getEmptyTagtype = {id=0, name="", tagList=[]}

getEmptyTag: Tag
getEmptyTag = {id=Nothing, name="", tagtype={id=Nothing, name=""}}

getEmptyRecipe: Recipe
getEmptyRecipe = {
    aikz=1,
    id=Nothing,
    image=Nothing,
--    ingredients=Nothing,
    parts=Nothing,
    name="",
    translate = Nothing,
    number=Nothing,
    number_comment=Nothing,
    nv_carbohydrates=Nothing,
    nv_energy=Nothing,
    nv_fat=Nothing,
    nv_protein=Nothing,
    nv_size=Nothing,
    source=Nothing,
    source_page=Nothing,
    tags=Nothing,
    todos=Nothing
  }
