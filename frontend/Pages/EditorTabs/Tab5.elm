module Pages.EditorTabs.Tab5 exposing(showTab)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick, onInput, on)
import List exposing (..)
import List.Extra as ListE
import Json.Decode as Json

--import Html.Events.Extra exposing (targetValueIntParse)

import Devs.Objects as Objects exposing (..)
import Devs.TypeObject as TO exposing (Msg)
import Pages.Utils as PU exposing (getSelectOption)
-- View

showTab: Model -> Html Msg
showTab model =
  let
    tabClass = if model.selectedTab == "Tab5" then "showTabContent" else "hideTabContent"
    recForEdit = case model.selectedRecipe of
      Just rec -> rec
      Nothing -> Objects.getEmptyRecipe
    carboValue = case recForEdit.nv_carbohydrates of
      Just val -> String.fromFloat val
      Nothing -> ""
    energyValue = case recForEdit.nv_energy of
      Just val -> String.fromFloat val
      Nothing -> ""
    fatValue = case recForEdit.nv_fat of
      Just val -> String.fromFloat val
      Nothing -> ""
    protValue = case recForEdit.nv_protein of
      Just val -> String.fromFloat val
      Nothing -> ""
    sizeValue = case recForEdit.nv_size of
      Just val -> String.fromInt val
      Nothing -> ""
  in
        Html.div[ class tabClass ] [
          Html.div[][
            Html.label [ for "size" ][ Html.text "Portionsgröße" ],
            Html.input [ type_ "number", onInput TO.SetSize, id "size", value sizeValue ][]
          ],
          Html.div[][
            Html.label [ for "carbo" ][ Html.text "Kohlenhydrate" ],
            Html.input [ type_ "number", step "0.1", onInput TO.SetCarbo, id "carbo", value carboValue ][]
          ],
          Html.div[][
            Html.label [ for "energy" ][ Html.text "Brennwert" ],
            Html.input [ type_ "number", step "0.1", onInput TO.SetEnergy, id "energy", value energyValue ][]
          ],
          Html.div[][
            Html.label [ for "fat" ][ Html.text "Fett" ],
            Html.input [ type_ "number", step "0.1", onInput TO.SetFat, id "fat", value fatValue ][]
          ],
          Html.div[][
            Html.label [ for "prot" ][ Html.text "Eiweiß" ],
            Html.input [ type_ "number", step "0.1", onInput TO.SetProt, id "prot", value protValue ][]
          ]
        ]
