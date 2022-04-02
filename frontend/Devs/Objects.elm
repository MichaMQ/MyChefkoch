module Devs.Objects exposing (..)

import UUID
import Random

--import Video as VideoObj

-- Enum
type EditForm =
  BasicForm
  | TagForm
  | IngredientForm
  | TodoForm
  | FootValueForm
  | None

type Role = ADMIN | USER
type AccountType = HASH | INIT

-- Model
type alias ServerParams = {serverProtokoll: String, serverHost: String, serverUrlPrefix: String, apiUrlPrefix: String, iconPath: String, imagePath: String}
type alias KeyLists = {sourceList: Maybe (List Source), tagList: Maybe (List Tag), unitList: Maybe (List Unit), partList: Maybe (List PartLight)}
type alias TagtypeShort = {id: Maybe Int, name: String, uuid: String}
type alias Tag = {id: Maybe Int, name: String, tagType: TagtypeShort, uuid: String}
type alias Tagtype = {id: Int, name: String, tagList: List Tag, uuid: String}
type alias UnitCategory = {id: Int, name: String, uuid: String}
type alias Unit = {id: Int, name: String, unitCategory: UnitCategory, uuid: String}
type alias Source = {id: Maybe Int, isbn: Maybe String, name: String, year: Maybe String, uuid: String}
type alias Person = {id: Maybe Int, firstname: String, surname: String, role: Role, uuid: String}
type alias Account = {id: Int, username: String, passwordhash: String, token: String, accountType: AccountType, expirationdate: String, uuid: String}
type alias Session = { person: Person, account: Account }

type alias Todo = {
  id: Int
  , image: Maybe String
  , image_comment: Maybe String
  , number: Int
  , text: String
  , uuid: String}
type alias Ingredient = {
  id: Maybe Int
  , name: String
  , comment: Maybe String
  , part: Maybe PartLight
  , quantity: Maybe Float
  , sortorder: Int
  , unit: Maybe Unit
  , uuid: String}
type alias Part = {id: Int, name: String, ingredients: List Ingredient, uuid: String}
type alias PartLight = {id: Int, name: String, uuid: String}
type alias RecipeLight = {id: Int, name: String, uuid: String}
type alias Recipe = {
  aikz: Int,
  id: Maybe Int,
  image: Maybe String,
  ingredients: List Ingredient,
  parts: List Part,
  name: String,
  translate: Maybe String,
  number: Maybe Int,
  number_for_display: Maybe Float,
  number_comment: Maybe String,
  nv_carbohydrates: Maybe Float,
  nv_energy: Maybe Float,
  nv_fat: Maybe Float,
  nv_protein: Maybe Float,
  nv_size: Maybe Int,
  source: Maybe Source,
  source_page: Maybe Int,
  person: Person,
  tags: List Tag,
  todos: List Todo,
  uuid: String}
type alias ImagePortData = { contents : String, filename : String }

type alias Model = {
  currentSeed : Maybe Random.Seed
  , random: Int
  , sp: ServerParams
  , alertMessage: Maybe String
  , subAlertMessage: Maybe String
  , recAlertMessage: Maybe String
  , searchValue: String
  , tagtypeList: Maybe (List Tagtype)
  , selectedTag: Maybe Tag
  , recipesOfSelectedTag: Maybe (List RecipeLight)
  , selectedRecipe: Maybe Recipe
--  , recipeForEdit: Maybe Recipe
  , recImage: Maybe ImagePortData
--  , selectedTab: String
  , newSource: Maybe Source
  , addTag: Maybe Tag
  , kl: KeyLists
  , session: Maybe Session
--    loggedIn: Maybe Bool
  , deleteRecipe: Bool
  , usernameForCheck: String
  , passwordForCheck: String
  , showEditForm: Maybe EditForm
  }

type alias InitData = {
  random: Int
  , protocol: String
  , serverName: String
  , serverPort: Int
  }

-- Model

keyLists: KeyLists
keyLists = {sourceList = Nothing, tagList = Nothing, unitList = Nothing, partList = Nothing}

serverParams: ServerParams
serverParams = {serverProtokoll = "http://",
    serverHost = "localhost:8085",
    serverUrlPrefix = "/RecipeServer",
    apiUrlPrefix = "/api/v1",
    iconPath = "icons/",
    imagePath = "images/"
  }

initialModel: Model
initialModel = {
  currentSeed = Nothing
  , random = 123456789
  , sp = serverParams
  , alertMessage = Nothing
  , subAlertMessage = Nothing
  , recAlertMessage = Nothing
  , searchValue = ""
  , tagtypeList = Nothing
  , selectedTag = Nothing
  , recipesOfSelectedTag = Nothing
  , selectedRecipe = Nothing
--  , recipeForEdit = Nothing
  , recImage = Nothing
--  , selectedTab = "Tab1"
  , newSource = Nothing
  , addTag = Nothing
  , kl = keyLists
  , session = Nothing
--    loggedIn = Nothing
  , deleteRecipe = False
  , usernameForCheck = ""
  , passwordForCheck = ""
  , showEditForm = Nothing
  }

getEmptyTodo: Int -> Todo
getEmptyTodo newNumber = {
  id=0
  , image=Nothing
  , image_comment=Nothing
  , number=newNumber
  , text=""
  , uuid=UUID.toString UUID.nil
  }

getEmptyIngre: Int -> Maybe PartLight -> Ingredient
getEmptyIngre newOrder newPart = {
  id=Nothing,
  name="",
  comment=Nothing ,
  part=newPart,
  quantity=Nothing,
  sortorder=newOrder,
  unit=Nothing
  , uuid=UUID.toString UUID.nil
  }

getEmptyUnit: Unit
getEmptyUnit = {
  id=0
  , name=""
  , unitCategory={id=0, name="", uuid=UUID.toString UUID.nil}
  , uuid=UUID.toString UUID.nil
  }

getEmptySource: Source
getEmptySource = {
  id=Nothing
  , isbn=Nothing
  , name=""
  , year=Nothing
  , uuid=UUID.toString UUID.nil
  }

getEmptyTagtype: Tagtype
getEmptyTagtype = {id=0, name="", tagList=[], uuid=UUID.toString UUID.nil}

getEmptyPart: PartLight
getEmptyPart = {id=-2, name="Sonstige Zutaten", uuid=UUID.toString UUID.nil}

getPartOfPartLight: PartLight -> Part
getPartOfPartLight pl = {id=pl.id, name=pl.name, ingredients=[], uuid=pl.uuid}

getEmptyTag: Tag
getEmptyTag = {id=Nothing, name="", tagType={id=Nothing, name="", uuid=UUID.toString UUID.nil}, uuid=UUID.toString UUID.nil}

getEmptyAccount: Account
getEmptyAccount = Account -1 "" "" "" INIT "" (UUID.toString UUID.nil)

getEmptyPerson: Person
getEmptyPerson = Person Nothing "" "" USER (UUID.toString UUID.nil)

getEmptySession: Session
getEmptySession = Session getEmptyPerson getEmptyAccount

getEmptyRecipe: Recipe
getEmptyRecipe = {
    aikz=1
    , id=Nothing
    , image=Nothing
    , ingredients=[]
    , parts=[]
    , name=""
    , translate = Nothing
    , number=Nothing
    , number_for_display=Nothing
    , number_comment=Nothing
    , nv_carbohydrates=Nothing
    , nv_energy=Nothing
    , nv_fat=Nothing
    , nv_protein=Nothing
    , nv_size=Nothing
    , source=Nothing
    , source_page=Nothing
    , person = getEmptyPerson
    , tags=[]
    , todos=[]
    , uuid=UUID.toString UUID.nil
  }
