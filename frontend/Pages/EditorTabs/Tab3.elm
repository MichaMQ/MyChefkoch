module Pages.EditorTabs.Tab3 exposing(showTab)

import Html exposing (..)
import Html.Extra as Html
import Html.Attributes as Attr
import Html.Events as Ev
import Html.Events.Extra as Ev
import List as List
import List.Extra as List

import Devs.Objects as O
import Devs.TypeObject as TO
import Pages.Utils as PU
-- View

showTab: O.Model -> Html TO.Msg
showTab model =
  let
    recForEdit = case model.selectedRecipe of
      Just rec -> rec
      Nothing -> O.getEmptyRecipe
    initialUnitList = case model.kl.unitList of
      Just src -> src
      Nothing -> []
    initialPartList = case model.kl.partList of
      Just src -> src
      Nothing -> []
--    _ = Debug.log "recForEdit: " recForEdit
  in
        Html.div[ Attr.class "showTabContent" ](
          List.concat [
            [getLabelRow],
            ( List.map (showIngreList model.sp initialUnitList initialPartList recForEdit.id) (List.sortBy .sortorder recForEdit.ingredients) ),
            [Html.div[][
              Html.button [ Ev.onClick TO.AddIngreToRecipe ][ Html.text "Zutat hinzufügen" ]
            ]]
          ]
        )

getLabelRow: Html TO.Msg
getLabelRow =
  Html.div[ Attr.class "labelRow"][
      Html.label[ Attr.for "order", Attr.class "orderLabel" ][ Html.text "Order" ],
      Html.label[ Attr.for "ingre", Attr.class "ingrLabel" ][ Html.text "Zutat" ],
      Html.label[ Attr.for "quant", Attr.class "quantLabel" ][ Html.text "Menge" ],
      Html.label[ Attr.for "unit", Attr.class "unitLabel" ][ Html.text "Einheit" ],
      Html.label[ Attr.for "comment", Attr.class "ingrLabel" ][ Html.text "Kommentar" ],
      Html.label[ Attr.for "part", Attr.class "partLabel" ][ Html.text "Teil" ]
  ]

showIngreList: O.ServerParams -> List O.Unit -> List O.PartLight -> Maybe Int -> O.Ingredient -> Html TO.Msg
showIngreList sp unitList partList recipeId ingre =
  let
    quant = case ingre.quantity of
      Just quantTmp -> (String.fromFloat quantTmp)
      Nothing -> ""
    part = case ingre.part of
      Just partTmp -> partTmp
      Nothing -> O.getEmptyPart
    unit = case ingre.unit of
      Just unitTmp -> unitTmp
      Nothing -> O.getEmptyUnit
    commentVal = case ingre.comment of
      Just val -> val
      Nothing -> ""
  in
    Html.div[ Attr.class "ingreRow" ] (
        List.concat [
            [
              Html.input[ Attr.id "order", Ev.onInput (TO.SetIngreOrder ingre.uuid), Attr.type_ "number", Attr.class "orderInput", Attr.value (String.fromInt ingre.sortorder) ][],
              Html.input[ Attr.id "ingre", Ev.onInput (TO.SetIngreName ingre.uuid), Attr.class "ingrInput", Attr.value ingre.name ][],
              Html.input[ Attr.id "quant", Ev.onInput (TO.SetIngreQuant ingre.uuid), Attr.type_ "number", Attr.step "0.1", Attr.class "quantInput", Attr.value quant ][],
              Html.select [ Attr.id "unit", Ev.onChange (TO.SetIngreUnit ingre.uuid) ] (List.append [PU.getSelectOption](List.map (showUnitOption unit) unitList)),
              Html.input[ Attr.id "comment", Ev.onInput (TO.SetIngreComment ingre.uuid), Attr.class "ingrInput", Attr.value commentVal ][],
              Html.select [ Attr.id "part", Ev.onChange (TO.SetIngrePart ingre.uuid) ] (List.append [PU.getSelectOption](List.map (showPartOption part) partList))
            ],
            case ingre.id of
              Just _ -> [
                  PU.getEditButton sp (Just True) "delete.png" Nothing (TO.DeleteIncredient ingre) [] (Just 15)
                  , PU.getEditButton sp (Just True) "save.png" Nothing (TO.UpdateIncredient ingre) [] (Just 15)
                ]
              Nothing -> case recipeId of
                Just recId -> [
                    PU.getEditButton sp (Just True) "delete.png" Nothing (TO.RemoveEmptyIngretient ingre.uuid) [Attr.style "margin-top" "10px"] Nothing
                    , PU.getEditButton sp (Just True) "save.png" Nothing (TO.AddIncredient ingre recId) [Attr.style "margin-top" "10px"] Nothing
                  ]
                Nothing -> []
        ]
      )

showUnitOption: O.Unit -> O.Unit -> Html TO.Msg
showUnitOption unitListValue unit =
  let
    selectedVal = if unitListValue.uuid == unit.uuid then True else False
  in
    Html.option[ Attr.value unit.uuid, Attr.selected selectedVal ][ Html.text (unit.name ++ " (" ++ unit.unitCategory.name ++ ")") ]

showPartOption: O.PartLight -> O.PartLight -> Html TO.Msg
showPartOption partListValue part =
  let
    selectedVal = if partListValue.uuid == part.uuid then True else False
  in
    Html.option[ Attr.value part.uuid, Attr.selected selectedVal ][ Html.text (part.name) ]
