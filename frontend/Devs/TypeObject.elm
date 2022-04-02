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
  | HandleLogin (Result Http.Error String)
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
