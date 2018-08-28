module Pages.RecipeView exposing(viewRecipe)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick, onInput)
import List exposing (..)

import Devs.Objects as Objects exposing (..)
-- View

viewRecipe: Maybe Bool -> Recipe -> ServerParams -> Html Msg
viewRecipe loggedIn rec sp =
  let
    isLoggedIn = case loggedIn of
      Just log -> log
      Nothing -> False
    actionButton = if isLoggedIn == True
      then Html.button [ onClick EditRecipe ][ Html.text "bearbeiten" ]
      else Html.span [][]
    header = case rec.translate of
      Just translate -> rec.name ++ " (" ++ translate ++ ")"
      Nothing -> rec.name
    source = case rec.source of
      Just source -> "Quelle: " ++ source.name
      Nothing -> ""
    sourceYear = case rec.source of
      Just source -> case source.year of
        Just year -> "; Veröffentlicht am: " ++ year
        Nothing -> ""
      Nothing -> ""
    sourcePage = case rec.source_page of
      Just page -> "; Seite: " ++ toString page
      Nothing -> ""
    sourceIsbn = case rec.source of
      Just source -> case source.isbn of
        Just isbn -> "; ISBN: " ++ isbn
        Nothing -> ""
      Nothing -> ""
    amazonLink = case rec.source of
      Just source -> case source.isbn of
        Just isbn -> Html.a [ class "amazonLink", target "_blank", href ("https://www.amazon.de/gp/search/ref=sr_adv_b/?unfiltered=1&field-isbn=" ++ isbn ++ "&sort=relevancerank") ][ Html.img[ src (sp.iconPath ++ "amazon.png"), height 20 ][] ]
        Nothing -> Html.text ""
      Nothing -> Html.text ""
    tagList = case rec.tags of
      Just tags -> tags
      Nothing -> []
    number_comment = case rec.number_comment of
      Just comment -> comment
      Nothing -> "Portionen"
    number = case rec.number of
      Just number -> (toString number) ++ " " ++ number_comment
      Nothing -> ""
    recImage = case rec.image of
      Just img -> Html.img [ class "recipeImg", src (sp.imagePath ++ img) ][]
      Nothing -> Html.text ""
    ingredients = case rec.ingredients of
      Just ingredients -> ingredients
      Nothing -> []
    todos = case rec.todos of
      Just todos -> todos
      Nothing -> []
  in
    Html.div [ id "contentDiv", class "cf" ] [
      Html.div[ class "noprint" ][
        Html.button [ onClick RemoveSelectedRecipe ][ Html.text "zur Liste zurück" ], actionButton ],
      Html.div [ id "recipeDiv" ][
        Html.h2 [][ Html.text header ],
        Html.div [ id "recipeSource" ][ Html.text (source ++ sourcePage ++ sourceYear ++ sourceIsbn), amazonLink ],
        Html.div [ id "recipeTags" ][ Html.text ("Tags: " ++ (String.join ", " (List.map getTagName (sortBy .name tagList)))) ],
        Html.figure [][ recImage, Html.figcaption [][ Html.text number ] ],
        Html.div [ id "ingredientsDiv" ][
          Html.h4 [][ Html.text "Zutaten" ],
          Html.table [ class "incredientsTable" ][ Html.tbody [] ( List.map showIngrRow (sortBy .sortorder ingredients) ) ]
        ],
        Html.div [ id "todosDiv" ][
          Html.h4 [][ Html.text "Zubereitung" ],
          Html.div [] (List.map (showTodoRow sp) (sortBy .number todos))
        ]
      ]
    ]

showTodoRow: ServerParams -> Todo -> Html Msg
showTodoRow sp todo =
  let
    image = case todo.image of
      Just img -> Html.img [ class "todoImg", src (sp.imagePath ++ img) ][]
      Nothing -> Html.text ""
  in
    Html.div [][
      Html.div [ id "todo" ][
        Html.div [ class "todoNr" ][ Html.text (toString todo.number) ],
        Html.span [][ Html.text todo.text ]
      ],
      Html.figure [][ image ]
    ]

showIngrRow: Ingredient -> Html Msg
showIngrRow ingr =
  let
    comment = case ingr.comment of
      Just comment -> ", " ++ comment
      Nothing -> ""
    unit = case ingr.unit of
      Just unit -> " " ++ unit.name
      Nothing -> ""
    quantity = case ingr.quantity of
      Just quantity -> (toString quantity) ++ unit
      Nothing -> ""
  in
    Html.tr[ class "incredientsRow" ][
      Html.td [ class "amount" ][ Html.text quantity ],
      Html.td [][ Html.text (ingr.name ++ comment) ]
    ]

getTagName: Tag -> String
getTagName tag = tag.name ++ " (" ++  tag.tagType.name ++ ")"

