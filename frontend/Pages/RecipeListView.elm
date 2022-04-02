module Pages.RecipeListView exposing(viewRecipesOfTag)

import Html exposing (..)
import Html.Attributes as Attr
import Html.Events as Ev
import List

import Devs.Objects as O
import Devs.TypeObject as TO
-- View

viewRecipesOfTag: O.Model -> Html TO.Msg
viewRecipesOfTag model =
  let
    selectedTagName = case model.selectedTag of
      Just tag -> tag.name
      Nothing -> "Rezepte mit '" ++ String.trim model.searchValue ++ "'"
    recipeList = case model.recipesOfSelectedTag of
      Just recList -> recList
      Nothing -> []
  in showRecipeList recipeList selectedTagName

showRecipeList: List O.RecipeLight -> String -> Html TO.Msg
showRecipeList recipeList divHeader =
    Html.div [ Attr.id "contentDiv", Attr.class "cf" ] [
      Html.div[][ Html.button [ Ev.onClick TO.RemoveSelectedTag ][ Html.text "zur Startseite" ] ],
      Html.div [ Attr.id "categoryTypeDiv", Attr.style "width" "99%" ][
        Html.h3 [][ Html.text divHeader ],
        Html.div [ Attr.id "categoryDiv" ] (List.map showRecipeView recipeList)
      ]
    ]

showRecipeView: O.RecipeLight -> Html TO.Msg
showRecipeView rec =
  Html.button [
    Attr.id (String.fromInt rec.id),
    Attr.class "tagLink",
    Ev.onClick (TO.ShowRecipe (Just rec))
  ][ Html.text rec.name ]
