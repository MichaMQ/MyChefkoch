module Pages.RecipeListView exposing(viewRecipesOfTag)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick, onInput)
import List exposing (..)

import Devs.Objects as Objects exposing (..)
-- View

viewRecipesOfTag: Model -> Html Msg
viewRecipesOfTag model =
  let
    selectedTagName = case model.selectedTag of
      Just tag -> tag.name
      Nothing -> "Rezepte mit '" ++ String.trim model.searchValue ++ "'"
    recipeList = case model.recipesOfSelectedTag of
      Just recList -> recList
      Nothing -> []
  in showRecipeList recipeList selectedTagName

showRecipeList: List RecipeLight -> String -> Html Msg
showRecipeList recipeList divHeader =
    Html.div [ id "contentDiv", class "cf" ] [
      Html.div[][ Html.button [ onClick RemoveSelectedTag ][ Html.text "zur Startseite" ] ],
      Html.div [ id "categoryTypeDiv", style "width" "99%" ][
        Html.h3 [][ Html.text divHeader ],
        Html.div [ id "categoryDiv" ] (List.map showRecipeView recipeList)
      ]
    ]

showRecipeView: RecipeLight -> Html Msg
showRecipeView rec =
  Html.button [
    id (String.fromInt rec.id),
    class "tagLink",
    onClick (ShowRecipe (Just rec))
  ][ Html.text rec.name ]
