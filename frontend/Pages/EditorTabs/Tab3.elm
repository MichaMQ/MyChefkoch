module Pages.EditorTabs.Tab3 exposing(showTab)

import Tuple exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick, onInput, on)
import List exposing (..)
import List.Extra as ListE
import Json.Decode as Json

import Html.Events.Extra exposing (targetValueIntParse)

import Devs.Objects as Objects exposing (..)
import Pages.Utils as PU exposing (getSelectOption)
-- View

showTab: Model -> Html Msg
showTab model =
  let
    tab3Class = if model.selectedTab == "Tab3" then "showTabContent" else "hideTabContent"
    recForEdit = case model.recipeForEdit of
      Just rec -> rec
      Nothing -> Objects.getEmptyRecipe
    initialUnitList = case model.kl.unitList of
      Just src -> src
      Nothing -> []
    partListOfRec = case recForEdit.parts of
      Just parts -> parts
      Nothing -> []
  in
        Html.div[ class tab3Class ] (
          List.concat [
            [getLabelRow],
            ( List.map (showIngreList initialUnitList) (indexedMap Tuple.pair (sortBy .name partListOfRec)) ),
            [Html.div[][
--              Html.button [ onClick AddIngreToRecipe ][ Html.text "Zutat hinzufügen" ]
            ]]
          ]
        )

getLabelRow: Html Msg
getLabelRow =
  Html.div[ class "labelRow"][
      Html.label[ for "order", class "orderLabel" ][ Html.text "Order" ],
      Html.label[ for "ingre", class "ingrLabel" ][ Html.text "Zutat" ],
      Html.label[ for "quant", class "quantLabel" ][ Html.text "Menge" ],
      Html.label[ for "unit", class "unitLabel" ][ Html.text "Einheit" ],
      Html.label[ for "comment", class "ingrLabel" ][ Html.text "Kommentar" ],
      Html.label[ for "part", class "partLabel" ][ Html.text "Teil" ]
  ]

showIngreList: List Unit -> (Int, Part) -> Html Msg
showIngreList unitList partObj =
  let
    idx = first partObj
    part = second partObj
{-
    quant = case ingre.quantity of
      Just quantTmp -> (String.fromFloat quantTmp)
      Nothing -> ""
    unit = case ingre.unit of
      Just unitTmp -> unitTmp
      Nothing -> Objects.getEmptyUnit
    commentVal = case ingre.comment of
      Just val -> val
      Nothing -> ""
-}
  in
    Html.div[ class "ingreRow" ][
--      Html.input[ id "order", onInput (SetIngreOrder idx), type_ "number", class "orderInput", value (String.fromInt ingre.sortorder) ][],
--      Html.input[ id "ingre", onInput (SetIngreName idx), class "ingrInput", value ingre.name ][],
--      Html.input[ id "quant", onInput (SetIngreQuant idx), type_ "number", step "0.1", class "quantInput", value quant ][],
--      Html.select [ id "unit", on "change" (Json.map (SetIngreUnit idx) targetValueIntParse) ] (List.append [PU.getSelectOption](List.map (showUnitOption unit) unitList)),
--      Html.input[ id "comment", onInput (SetIngreComment idx), class "ingrInput", value commentVal ][],
--      Html.input[ id "part", onInput (SetIngrePart idx), type_ "number", class "partInput", value (String.fromInt part) ][],
--      Html.button [ onClick RemoveIngreFromRecipe ][ Html.text "-" ]
    ]

showUnitOption: Unit -> Unit -> Html Msg
showUnitOption unitListValue unit =
  let
    selectedVal = if unitListValue.id == unit.id then True else False
  in
    Html.option[ value (String.fromInt unit.id), selected selectedVal ][ Html.text (unit.name ++ " (" ++ unit.unitCategory.name ++ ")") ]
