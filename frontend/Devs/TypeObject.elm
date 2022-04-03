module Devs.TypeObject exposing (..)

import Http

import Devs.Objects as O

-- Types
type Msg =
  NoOp
  | Initialize O.InitData
  | ImageSelected
  | ImageRead O.ImagePortData
  | ShowOverView
  | ToggleEditForm O.EditForm
  | GetLoginForm
  | SetUsernameForCheck String
  | SetPasswortForCheck String
  | Login
  | HandleLogin (Result Http.Error O.Session)
  | ShowRecipesOfTag (Maybe O.Tag)
  | ShowRecipe (Maybe O.RecipeLight)
  | SetNumberForDisplay String
  | EditRecipe
  | InsertRecipe
  | SaveRecipe
  | SavedRecipe (Result Http.Error (O.Recipe))
  | DeleteRecipe
  | SetAikz Int
  | SetName String
  | SetTranslate String
  | SetNumber String
  | SetNumberComment String
  | SetRecImage String
  | RemoveImageFromRecipe
  | SetCarbo String
  | SetEnergy String
  | SetFat String
  | SetProt String
  | SetSize String
  | SetSourcePage String
  | SetSource String
  | AddNewSource
  | SetSrcName String
  | SetSrcIsbn String
  | SetSrcYear String
  | CancelSourceEdit
  | SaveNewSource
  | SavedSource (Result Http.Error (O.Source))
  | ChooseNewTag
  | SetChoosenTag String
  | RemoveTagFromRec String
  | CancelAddTag
  | AddTagToRecipe
  | AddIngreToRecipe
  | SetIngreOrder String String
  | SetIngreName String String
  | SetIngrePart String String
  | SetIngreUnit String String
  | SetIngreQuant String String
  | SetIngreComment String String
  | AddTodoToRecipe
  | SetTodoNr String String
  | SetTodoText String String
  | SetTodoImg String String
  | SetTodoImgComment String String
  | CancelRecipeEdit
  | ConfirmDelete
  | CancelDelete
  | CancelLogin
  | CloseAlert
  | CloseLoginAlert
  | CloseRecipeAlert
  | RemoveSelectedTag
  | RemoveSelectedRecipe
  | ListTagtypes (Result Http.Error (List O.Tagtype))
  | ListRecipesForTag (Result Http.Error (List O.RecipeLight))
  | SetRecipe (Result Http.Error O.Recipe)
  | SetUnitList (Result Http.Error (List O.Unit))
  | SetSourceList (Result Http.Error (List O.Source))
  | SetTagList (Result Http.Error (List O.Tag))
  | SetPartList (Result Http.Error (List O.PartLight))
  | SetSearchInput String
  | SearchRecipe
  | UploadImage (Result Http.Error Bool)
  | AddIncredient O.Ingredient Int
  | UpdateIncredient O.Ingredient
  | RemoveEmptyIngretient String
  | DeleteIncredient O.Ingredient
  | DeleteSource Int
  | DeleteTag Int
  | AddTodo O.Todo Int
  | UpdateTodo O.Todo
  | RemoveEmptyTodo String
  | DeleteTodo O.Todo

  | UpdateIncredientResp (Result Http.Error Bool)
  | RemoveIngreFromRecipe String (Result Http.Error Bool)
  | AddIngreToRecipeResp (Result Http.Error O.Ingredient)
  
  | UpdateTodoResp (Result Http.Error Bool)
  | RemoveTodoFromRecipe String (Result Http.Error Bool)
  | AddTodoToRecipeResp (Result Http.Error O.Todo)

  | DeleteSourceResp Int (Result Http.Error Bool)
  | DeleteTagResp Int (Result Http.Error Bool)
 -- | DeleteTodoResp Int (Result Http.Error Bool)
