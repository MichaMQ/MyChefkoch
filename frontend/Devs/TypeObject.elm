module Devs.TypeObject exposing (..)

import Http

import Devs.Objects as O exposing (..)

-- Types
type Msg =
  NoOp
  | Initialize InitData
  | ImageSelected
  | ImageRead ImagePortData
  | ShowOverView
  | ToggleEditForm EditForm
  | GetLoginForm
  | SetUsernameForCheck String
  | SetPasswortForCheck String
  | Login
  | HandleLogin (Result Http.Error String)
  | ShowRecipesOfTag (Maybe Tag)
  | ShowRecipe (Maybe RecipeLight)
  | EditRecipe
  | InsertRecipe
  | SaveRecipe
  | SavedRecipe (Result Http.Error (Recipe))
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
  | SavedSource (Result Http.Error (Source))
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
  | RemoveIngreFromRecipe String
  | AddTodoToRecipe
  | SetTodoNr String String
  | SetTodoText String String
  | SetTodoImg String String
  | SetTodoImgComment String String
  | RemoveTodoFromRecipe String
  | CancelRecipeEdit
  | ConfirmDelete
  | CancelDelete
  | CancelLogin
  | CloseAlert
  | CloseLoginAlert
  | CloseRecipeAlert
  | RemoveSelectedTag
  | RemoveSelectedRecipe
  | ListTagtypes (Result Http.Error (List Tagtype))
  | ListRecipesForTag (Result Http.Error (List RecipeLight))
  | SetRecipe (Result Http.Error Recipe)
  | SetUnitList (Result Http.Error (List Unit))
  | SetSourceList (Result Http.Error (List Source))
  | SetTagList (Result Http.Error (List Tag))
  | SetPartList (Result Http.Error (List PartLight))
  | SetSearchInput String
  | SearchRecipe
  | UploadImage (Result Http.Error Bool)
