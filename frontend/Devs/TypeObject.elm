module Devs.TypeObject exposing (..)

import Http

import Devs.Objects as O exposing (..)

-- Types
type Msg =
  NoOp |
  ImageSelected |
  ImageRead ImagePortData |
  ShowOverView |
  GetLoginForm |
  SetUsernameForCheck String |
  SetPasswortForCheck String |
  Login |
  HandleLogin (Result Http.Error String) |
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
  AddIngreToRecipe |
  SetIngreOrder Int String |
  SetIngreName Int String |
  SetIngrePart Int Int |
  SetIngreUnit Int Int |
  SetIngreQuant Int String |
  SetIngreComment Int String |
  RemoveIngreFromRecipe |
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
  SetPartList (Result Http.Error (List PartLight)) |
  SetSearchInput String |
  SearchRecipe |
  UploadImage (Result Http.Error Bool)
