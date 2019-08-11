module Pages.EditorTabs.Tab3 exposing(showTab)

import Tuple exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick, onInput, on)
import List exposing (..)
import List.Extra as ListE
import Json.Decode as Json
import Debug exposing (log)

import Html.Events.Extra exposing (targetValueIntParse)

import Devs.Objects as Objects exposing (..)
import Devs.TypeObject as TO exposing (Msg)
import Pages.Utils as PU exposing (getSelectOption)
-- View

showTab: Model -> Html Msg
showTab model =
  let
--    tab3Class = if model.selectedTab == "Tab3" then "showTabContent" else "hideTabContent"
    tab3Class = "showTabContent"
    recForEdit = case model.selectedRecipe of
      Just rec -> rec
      Nothing -> Objects.getEmptyRecipe
    initialUnitList = case model.kl.unitList of
      Just src -> src
      Nothing -> []
    initialPartList = case model.kl.partList of
      Just src -> src
      Nothing -> []
    ingrListOfRec = case recForEdit.ingredients of
      Just ingre -> ingre
      Nothing -> []
--    _ = Debug.log "recForEdit: " recForEdit
  in
        Html.div[ class tab3Class ] (
          List.concat [
            [getLabelRow],
            ( List.map (showIngreList initialUnitList initialPartList) (indexedMap Tuple.pair (sortBy .sortorder ingrListOfRec)) ),
            [Html.div[][
              Html.button [ onClick TO.AddIngreToRecipe ][ Html.text "Zutat hinzufügen" ]
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

showIngreList: List Unit -> List PartLight -> (Int, Ingredient) -> Html Msg
showIngreList unitList partList (idx, ingre) =
  let
--    idx = first ingreObj
--    ingre = second ingreObj
    _ = Debug.log "ingre: " ingre
    quant = case ingre.quantity of
      Just quantTmp -> (String.fromFloat quantTmp)
      Nothing -> ""
    part = case ingre.part of
      Just partTmp -> partTmp
      Nothing -> Objects.getEmptyPart
    unit = case ingre.unit of
      Just unitTmp -> unitTmp
      Nothing -> Objects.getEmptyUnit
    commentVal = case ingre.comment of
      Just val -> val
      Nothing -> ""
  in
    Html.div[ class "ingreRow" ][
      Html.input[ id "order", onInput (TO.SetIngreOrder idx), type_ "number", class "orderInput", value (String.fromInt ingre.sortorder) ][],
      Html.input[ id "ingre", onInput (TO.SetIngreName idx), class "ingrInput", value ingre.name ][],
      Html.input[ id "quant", onInput (TO.SetIngreQuant idx), type_ "number", step "0.1", class "quantInput", value quant ][],
      Html.select [ id "unit", on "change" (Json.map (TO.SetIngreUnit idx) targetValueIntParse) ] (List.append [PU.getSelectOption](List.map (showUnitOption unit) unitList)),
      Html.input[ id "comment", onInput (TO.SetIngreComment idx), class "ingrInput", value commentVal ][],
--      Html.input[ id "part", onInput (SetIngrePart idx), type_ "number", class "partInput", value (String.fromInt part.id) ][],
      Html.select [ id "part", on "change" (Json.map (TO.SetIngrePart idx) targetValueIntParse) ] (List.append [PU.getSelectOption](List.map (showPartOption part) partList)),
      Html.button [ onClick TO.RemoveIngreFromRecipe ][ Html.text "-" ]
    ]

showUnitOption: Unit -> Unit -> Html Msg
showUnitOption unitListValue unit =
  let
    selectedVal = if unitListValue.id == unit.id then True else False
  in
    Html.option[ value (String.fromInt unit.id), selected selectedVal ][ Html.text (unit.name ++ " (" ++ unit.unitCategory.name ++ ")") ]

showPartOption: PartLight -> PartLight -> Html Msg
showPartOption partListValue part =
  let
    selectedVal = if partListValue.id == part.id then True else False
  in
    Html.option[ value (String.fromInt part.id), selected selectedVal ][ Html.text (part.name) ]
