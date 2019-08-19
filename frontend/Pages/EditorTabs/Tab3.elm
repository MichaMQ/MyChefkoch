module Pages.EditorTabs.Tab3 exposing(showTab)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick, onInput)
import Html.Events.Extra as EvE exposing (onChange)
import List exposing (..)
import List.Extra as ListE
import Debug exposing (log)

import Devs.Objects as Objects exposing (..)
import Devs.TypeObject as TO exposing (Msg)
import Pages.Utils as PU exposing (getSelectOption)
-- View

showTab: Model -> Html Msg
showTab model =
  let
    recForEdit = case model.selectedRecipe of
      Just rec -> rec
      Nothing -> Objects.getEmptyRecipe
    initialUnitList = case model.kl.unitList of
      Just src -> src
      Nothing -> []
    initialPartList = case model.kl.partList of
      Just src -> src
      Nothing -> []
--    _ = Debug.log "recForEdit: " recForEdit
  in
        Html.div[ class "showTabContent" ](
          List.concat [
            [getLabelRow],
            ( List.map (showIngreList initialUnitList initialPartList) (sortBy .sortorder recForEdit.ingredients) ),
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

showIngreList: List Unit -> List PartLight -> Ingredient -> Html Msg
showIngreList unitList partList ingre =
  let
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
      Html.input[ id "order", onInput (TO.SetIngreOrder ingre.uuid), type_ "number", class "orderInput", value (String.fromInt ingre.sortorder) ][],
      Html.input[ id "ingre", onInput (TO.SetIngreName ingre.uuid), class "ingrInput", value ingre.name ][],
      Html.input[ id "quant", onInput (TO.SetIngreQuant ingre.uuid), type_ "number", step "0.1", class "quantInput", value quant ][],
      Html.select [ id "unit", EvE.onChange (TO.SetIngreUnit ingre.uuid) ] (List.append [PU.getSelectOption](List.map (showUnitOption unit) unitList)),
      Html.input[ id "comment", onInput (TO.SetIngreComment ingre.uuid), class "ingrInput", value commentVal ][],
      Html.select [ id "part", EvE.onChange (TO.SetIngrePart ingre.uuid) ] (List.append [PU.getSelectOption](List.map (showPartOption part) partList)),
      Html.button [ onClick (TO.RemoveIngreFromRecipe ingre.uuid) ][ Html.text "-" ]
    ]

showUnitOption: Unit -> Unit -> Html Msg
showUnitOption unitListValue unit =
  let
    selectedVal = if unitListValue.uuid == unit.uuid then True else False
  in
    Html.option[ value unit.uuid, selected selectedVal ][ Html.text (unit.name ++ " (" ++ unit.unitCategory.name ++ ")") ]

showPartOption: PartLight -> PartLight -> Html Msg
showPartOption partListValue part =
  let
    selectedVal = if partListValue.uuid == part.uuid then True else False
  in
    Html.option[ value part.uuid, selected selectedVal ][ Html.text (part.name) ]
