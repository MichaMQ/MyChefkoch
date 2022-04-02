module Pages.RecipeView exposing(viewRecipe)

import Html exposing (..)
import Html.Attributes as Attr
import Html.Events as Ev
import List
import FormatNumber as FN
import FormatNumber.Locales exposing (..)

import Devs.Objects as O
import Devs.TypeObject as TO
import Devs.Utils as DU
import Pages.Utils as PU
-- View

viewRecipe: Maybe O.Session -> O.Recipe -> O.ServerParams -> Html TO.Msg
viewRecipe session rec sp =
  let
    actionButton = if (DU.isLoggedIn session (Just rec.person)) == True
      then Html.button [ Ev.onClick TO.EditRecipe ][ Html.text "bearbeiten" ]
      else Html.span [][]
    header = case rec.translate of
      Just translate -> rec.name ++ " (" ++ translate ++ ")"
      Nothing -> if String.isEmpty rec.name then "Bitte Name eingeben" else rec.name
    rec_source = case rec.source of
      Just source -> "Quelle: " ++ source.name
      Nothing -> ""
    owner = "Rezept von: " ++ rec.person.firstname ++ " " ++ rec.person.surname
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
    number = case rec.number of
      Just n -> n
      Nothing -> 1
    number_for_display = case rec.number_for_display of
      Just n -> n
      Nothing -> 1

    --rec_number = Html.text ((String.fromInt number_for_display) ++ " " ++ number_comment)
    rec_number = Html.span [][
        Html.input[Attr.id "number_for_display", Attr.type_ "number", Attr.class "numberInput", Ev.onInput TO.SetNumberForDisplay, Attr.value (String.fromFloat number_for_display)][]
        , Html.label[ Attr.for "number_for_display" ][ Html.text number_comment ]
      ]
    recImage = case rec.image of--data:image/png;base64,
      Just img -> Html.img [ Attr.class "recipeImg", Attr.src ("data:image/jpeg;base64," ++ img) ][]
      --Just img -> Html.img [ class "recipeImg", src (sp.imagePath ++ img) ][]
      Nothing -> Html.text ""
  in
    Html.div [ Attr.id "contentDiv", Attr.class "cf" ] [
      Html.div[ Attr.class "noprint" ][
        Html.button [ Ev.onClick TO.RemoveSelectedRecipe ][ Html.text "zur Liste zurück" ]],--, actionButton ],
      Html.div [ Attr.id "recipeDiv" ][
        Html.div [][
          Html.h2 [ Attr.style "float" "left", Attr.style "margin-right" "5px" ][
            PU.getEditHeader (DU.isLoggedIn session (Just rec.person)) header (TO.ToggleEditForm O.BasicForm)
          ]
          , PU.getEditButton sp (Just (DU.isLoggedIn session (Just rec.person))) "save.png" Nothing TO.SaveRecipe [Attr.style "margin-top" "10px"]
          , PU.getEditButton sp (Just (DU.isLoggedIn session (Just rec.person))) "delete.png" Nothing TO.ConfirmDelete [Attr.style "margin-top" "10px"]
        ]
        , Html.div [ Attr.id "recipeSource", Attr.style "clear" "both" ][ Html.text (rec_source ++ sourcePage ++ sourceYear ++ sourceIsbn), amazonLink ]
        , Html.div [ Attr.id "recipeOwner" ][ Html.text owner ]
        , Html.div [ Attr.id "recipeTags" ][
          PU.getEditHeader (DU.isLoggedIn session (Just rec.person)) "Tags:" (TO.ToggleEditForm O.TagForm)
          , Html.text (" " ++ (String.join ", " (List.map getTagName (List.sortBy .name rec.tags))))
        ]
        , Html.figure [][ recImage, Html.figcaption [][ rec_number ] ],
        Html.div [ Attr.id "recipe" ][
          Html.div [ Attr.id "ingredientsDiv" ][
            Html.h4 [][
              PU.getEditHeader (DU.isLoggedIn session (Just rec.person)) "Zutaten" (TO.ToggleEditForm O.IngredientForm)
            ]
            , Html.table [ Attr.class "incredientsTable" ][ Html.tbody [] ( List.map (showPartRow number number_for_display) (List.sortBy .name rec.parts) ) ]
          ],
          Html.div [ Attr.id "todosDiv" ][
            Html.h4 [][
              PU.getEditHeader (DU.isLoggedIn session (Just rec.person)) "Zubereitung" (TO.ToggleEditForm O.TodoForm)
            ]
            , Html.div [] (List.map (showTodoRow sp) (List.sortBy .number rec.todos))
          ],
          Html.div [ Attr.class "clear" ][]
        ]
      ]
    ]

showTodoRow: O.ServerParams -> O.Todo -> Html TO.Msg
showTodoRow sp todo =
  let
    image = case todo.image of
      Just img -> Html.img [ Attr.class "todoImg", Attr.src (sp.imagePath ++ img) ][]
      Nothing -> Html.text ""
  in
    Html.div [][
      Html.div [ Attr.id "todo" ][
        Html.div [ Attr.class "todoNr" ][ Html.text (String.fromInt todo.number) ],
        Html.span [][ Html.text todo.text ]
      ],
      Html.figure [][ image ]
    ]

showPartRow: Int -> Float -> O.Part -> Html TO.Msg
showPartRow number nfd part =
  let
    ingreRows = (List.map (showIngrRow number nfd) (List.sortBy .sortorder part.ingredients))
    partRow = Html.tr[ Attr.class "partsRow" ][
      Html.td [ Attr.colspan 2 ][ Html.text part.name ]
      ]
  in
    Html.tr[ ][ Html.td [][
      Html.table [ ][ Html.tbody [] (List.append [partRow] ingreRows) ]
    ]]

showIngrRow: Int -> Float -> O.Ingredient -> Html TO.Msg
showIngrRow number nfd ingr =
  let
    loc = { spanishLocale | decimals = Max 2 }
    ingr_comment = case ingr.comment of
      Just comment -> ", " ++ comment
      Nothing -> ""
    ingr_unit = case ingr.unit of
      Just unit -> " " ++ unit.name
      Nothing -> ""
    ingr_quantity = case ingr.quantity of
      Just quantity -> (quantity * nfd / (toFloat number) |> FN.format loc) ++ ingr_unit
      Nothing -> ""
  in
    Html.tr[ Attr.class "incredientsRow" ][
      Html.td [ Attr.class "amount" ][ Html.text ingr_quantity ],
      Html.td [][ Html.text (ingr.name ++ ingr_comment) ]
    ]

getTagName: O.Tag -> String
getTagName tag = tag.name ++ " (" ++  tag.tagType.name ++ ")"
