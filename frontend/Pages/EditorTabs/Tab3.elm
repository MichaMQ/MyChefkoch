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
    rec = case model.recipeForEdit of
      Just rec -> rec
      Nothing -> Objects.getEmptyRecipe
    initialUnitList = case model.kl.unitList of
      Just src -> src
      Nothing -> []
    ingrListOfRec = case rec.ingredients of
      Just ingre -> ingre
      Nothing -> []
  in
        Html.div[ class tab3Class ] (
          List.concat [
            [getLabelRow],
            ( List.map (showIngreList initialUnitList) (indexedMap (,) (sortBy .sortorder ingrListOfRec)) ),
            [Html.div[][
              Html.button [ onClick AddIngreToRecipe ][ Html.text "Zutat hinzufügen" ]
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

showIngreList: List Unit -> (Int, Ingredient) -> Html Msg
showIngreList unitList ingreObj =
  let
    idx = first ingreObj
    ingre = second ingreObj
    quant = case ingre.quantity of
      Just quant -> (toString quant)
      Nothing -> ""
    part = case ingre.part of
      Just part -> part
      Nothing -> 0
    unit = case ingre.unit of
      Just unit -> unit
      Nothing -> Objects.getEmptyUnit
    commentVal = case ingre.comment of
      Just val -> val
      Nothing -> ""
  in
    Html.div[ class "ingreRow" ][
      Html.input[ id "order", onInput (SetIngreOrder idx), type_ "number", class "orderInput", value (toString ingre.sortorder) ][],
      Html.input[ id "ingre", onInput (SetIngreName idx), class "ingrInput", value ingre.name ][],
      Html.input[ id "quant", onInput (SetIngreQuant idx), type_ "number", step "0.1", class "quantInput", value quant ][],
      Html.select [ id "unit", on "change" (Json.map (SetIngreUnit idx) targetValueIntParse) ] (List.append [PU.getSelectOption](List.map (showUnitOption unit) unitList)),
      Html.input[ id "comment", onInput (SetIngreComment idx), class "ingrInput", value commentVal ][],
      Html.input[ id "part", onInput (SetIngrePart idx), type_ "number", class "partInput", value (toString part) ][],
      Html.button [ onClick RemoveIngreFromRecipe ][ Html.text "-" ]
    ]

showUnitOption: Unit -> Unit -> Html Msg
showUnitOption unitListValue unit =
  let
    selectedVal = if unitListValue.id == unit.id then True else False
  in
    Html.option[ value (toString unit.id), selected selectedVal ][ Html.text (unit.name ++ " (" ++ unit.unitCategory.name ++ ")") ]
