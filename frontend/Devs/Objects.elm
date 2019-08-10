module Devs.Objects exposing (..)

--import Video as VideoObj

-- Model
type alias ServerParams = {serverProtokoll: String, serverHost: String, serverUrlPrefix: String, apiUrlPrefix: String, iconPath: String, imagePath: String}
type alias KeyLists = {sourceList: Maybe (List Source), tagList: Maybe (List Tag), unitList: Maybe (List Unit), partList: Maybe (List PartLight)}
type alias TagtypeShort = {id: Maybe Int, name: String}
type alias Tag = {id: Maybe Int, name: String, tagType: TagtypeShort}
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
  ingredients: Maybe (List Ingredient),
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
    loginToken: Maybe String,
--    loggedIn: Maybe Bool,
    deleteRecipe: Bool,
    usernameForCheck: String,
    passwordForCheck: String
  }

-- Model

keyLists: KeyLists
keyLists = {sourceList = Nothing, tagList = Nothing, unitList = Nothing, partList = Nothing}

serverParams: ServerParams
serverParams = {serverProtokoll = "http://",
    serverHost = "horst:8085",
    serverUrlPrefix = "/RecipeServer",
    apiUrlPrefix = "/api/v1",
    iconPath = "icons/",
    imagePath = "images/"
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
    loginToken = Nothing,
--    loggedIn = Nothing,
    deleteRecipe = False,
    usernameForCheck = "",
    passwordForCheck = ""
  }

getEmptyTodo: Int -> Todo
getEmptyTodo newNumber = {id=0, image=Nothing, image_comment=Nothing, number=newNumber, text=""}

getEmptyIngre: Int -> Maybe PartLight -> Ingredient
getEmptyIngre newOrder newPart = {
  id=Nothing,
  name="",
  comment=Nothing ,
  part=newPart,
  quantity=Nothing,
  sortorder=newOrder,
  unit=Nothing}

getEmptyUnit: Unit
getEmptyUnit = {id=0, name="", unitCategory={id=0, name=""}}

getEmptySource: Source
getEmptySource = {id=Nothing, isbn=Nothing, name="", year=Nothing}

getEmptyTagtype: Tagtype
getEmptyTagtype = {id=0, name="", tagList=[]}

getEmptyPart: PartLight
getEmptyPart = {id=-2, name="Sonstige Zutaten"}

getEmptyTag: Tag
getEmptyTag = {id=Nothing, name="", tagType={id=Nothing, name=""}}

getEmptyRecipe: Recipe
getEmptyRecipe = {
    aikz=1,
    id=Nothing,
    image=Nothing,
    ingredients=Nothing,
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
