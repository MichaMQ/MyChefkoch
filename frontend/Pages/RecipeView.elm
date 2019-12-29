module Pages.RecipeView exposing(viewRecipe)

import Html exposing (..)
import Html.Attributes as Attr exposing (..)
import Html.Events exposing (onClick, onInput)
import List exposing (..)

import Devs.Objects as O exposing (..)
import Devs.TypeObject as TO exposing (Msg)
import Devs.Utils as DU exposing (isLoggedIn)
import Pages.Utils as PU exposing (getEditButton, getEditHeader)
-- View

viewRecipe: Maybe String -> Recipe -> ServerParams -> Html Msg
viewRecipe loginToken rec sp =
  let
    actionButton = if (DU.isLoggedIn loginToken) == True
      then Html.button [ onClick TO.EditRecipe ][ Html.text "bearbeiten" ]
      else Html.span [][]
    header = case rec.translate of
      Just translate -> rec.name ++ " (" ++ translate ++ ")"
      Nothing -> if String.isEmpty rec.name then "Bitte Name eingeben" else rec.name
    rec_source = case rec.source of
      Just source -> "Quelle: " ++ source.name
      Nothing -> ""
    sourceYear = case rec.source of
      Just source -> case source.year of
        Just year -> "; Veröffentlicht am: " ++ year
        Nothing -> ""
      Nothing -> ""
    sourcePage = case rec.source_page of
      Just page -> "; Seite: " ++ String.fromInt page
      Nothing -> ""
    sourceIsbn = case rec.source of
      Just source -> case source.isbn of
        Just isbn -> "; ISBN: " ++ isbn
        Nothing -> ""
      Nothing -> ""
    amazonUrl = "https://www.amazon.de/gp/search?index=books&linkCode=qs&keywords="
    amazonLink = case rec.source of
      Just source -> case source.isbn of
--        Just isbn -> Html.a [ class "amazonLink", target "_blank", href ("https://www.amazon.de/gp/search/ref=sr_adv_b/?unfiltered=1&field-isbn=" ++ isbn ++ "&sort=relevancerank") ][ Html.img[ src (sp.iconPath ++ "amazon.png"), height 20 ][] ]
        Just isbn -> PU.getEditButton sp (Just True) "amazon.png" (Just (amazonUrl ++ (String.replace "-" "" isbn))) TO.NoOp []
        Nothing -> Html.text ""
      Nothing -> Html.text ""
    number_comment = case rec.number_comment of
      Just comment -> comment
      Nothing -> "Portionen"
    rec_number = case rec.number of
      Just number -> (String.fromInt number) ++ " " ++ number_comment
      Nothing -> ""
    recImage = case rec.image of
      Just img -> Html.img [ class "recipeImg", src (sp.imagePath ++ img) ][]
      Nothing -> Html.text ""
  in
    Html.div [ id "contentDiv", class "cf" ] [
      Html.div[ class "noprint" ][
        Html.button [ onClick TO.RemoveSelectedRecipe ][ Html.text "zur Liste zurück" ]],--, actionButton ],
      Html.div [ id "recipeDiv" ][
        Html.div [][
          Html.h2 [ Attr.style "float" "left", Attr.style "margin-right" "5px" ][
            PU.getEditHeader (DU.isLoggedIn loginToken) header (TO.ToggleEditForm O.BasicForm)
          ]
          , PU.getEditButton sp (Just (DU.isLoggedIn loginToken)) "save.png" Nothing TO.SaveRecipe [Attr.style "margin-top" "10px"]
          , PU.getEditButton sp (Just (DU.isLoggedIn loginToken)) "delete.png" Nothing TO.ConfirmDelete [Attr.style "margin-top" "10px"]
        ]
        , Html.div [ id "recipeSource", Attr.style "clear" "both" ][ Html.text (rec_source ++ sourcePage ++ sourceYear ++ sourceIsbn), amazonLink ]
        , Html.div [ id "recipeTags" ][
          PU.getEditHeader (DU.isLoggedIn loginToken) "Tags:" (TO.ToggleEditForm O.TagForm)
          , Html.text (" " ++ (String.join ", " (List.map getTagName (sortBy .name rec.tags))))
        ]
        , Html.figure [][ recImage, Html.figcaption [][ Html.text rec_number ] ],
        Html.div [ id "recipe" ][
          Html.div [ id "ingredientsDiv" ][
            Html.h4 [][
              PU.getEditHeader (DU.isLoggedIn loginToken) "Zutaten" (TO.ToggleEditForm O.IngredientForm)
            ]
            , Html.table [ class "incredientsTable" ][ Html.tbody [] ( List.map showPartRow (sortBy .name rec.parts) ) ]
          ],
          Html.div [ id "todosDiv" ][
            Html.h4 [][
              PU.getEditHeader (DU.isLoggedIn loginToken) "Zubereitung" (TO.ToggleEditForm O.TodoForm)
            ]
            , Html.div [] (List.map (showTodoRow sp) (sortBy .number rec.todos))
          ],
          Html.div [ class "clear" ][]
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
        Html.div [ class "todoNr" ][ Html.text (String.fromInt todo.number) ],
        Html.span [][ Html.text todo.text ]
      ],
      Html.figure [][ image ]
    ]

showPartRow: Part -> Html Msg
showPartRow part =
  let
    ingreRows = (List.map showIngrRow (sortBy .sortorder part.ingredients))
    partRow = Html.tr[ class "partsRow" ][
      Html.td [ colspan 2 ][ Html.text part.name ]
      ]
  in
    Html.tr[ ][ Html.td [][
      Html.table [ ][ Html.tbody [] ([partRow] ++ ingreRows) ]
    ]]

showIngrRow: Ingredient -> Html Msg
showIngrRow ingr =
  let
    ingr_comment = case ingr.comment of
      Just comment -> ", " ++ comment
      Nothing -> ""
    ingr_unit = case ingr.unit of
      Just unit -> " " ++ unit.name
      Nothing -> ""
    ingr_quantity = case ingr.quantity of
      Just quantity -> (String.fromFloat quantity) ++ ingr_unit
      Nothing -> ""
  in
    Html.tr[ class "incredientsRow" ][
      Html.td [ class "amount" ][ Html.text ingr_quantity ],
      Html.td [][ Html.text (ingr.name ++ ingr_comment) ]
    ]

getTagName: Tag -> String
getTagName tag = tag.name ++ " (" ++  tag.tagType.name ++ ")"
