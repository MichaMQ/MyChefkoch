module Pages.EditorTabs.Tab5 exposing(showTab)

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
    tabClass = if model.selectedTab == "Tab5" then "showTabContent" else "hideTabContent"
    rec = case model.recipeForEdit of
      Just rec -> rec
      Nothing -> Objects.getEmptyRecipe
    carboValue = case rec.nv_carbohydrates of
      Just val -> toString val
      Nothing -> ""
    energyValue = case rec.nv_energy of
      Just val -> toString val
      Nothing -> ""
    fatValue = case rec.nv_fat of
      Just val -> toString val
      Nothing -> ""
    protValue = case rec.nv_protein of
      Just val -> toString val
      Nothing -> ""
    sizeValue = case rec.nv_size of
      Just val -> toString val
      Nothing -> ""
  in
        Html.div[ class tabClass ] [
          Html.div[][
            Html.label [ for "size" ][ Html.text "Portionsgröße" ],
            Html.input [ type_ "number", onInput SetSize, id "size", value sizeValue ][]
          ],
          Html.div[][
            Html.label [ for "carbo" ][ Html.text "Kohlenhydrate" ],
            Html.input [ type_ "number", step "0.1", onInput SetCarbo, id "carbo", value carboValue ][]
          ],
          Html.div[][
            Html.label [ for "energy" ][ Html.text "Brennwert" ],
            Html.input [ type_ "number", step "0.1", onInput SetEnergy, id "energy", value energyValue ][]
          ],
          Html.div[][
            Html.label [ for "fat" ][ Html.text "Fett" ],
            Html.input [ type_ "number", step "0.1", onInput SetFat, id "fat", value fatValue ][]
          ],
          Html.div[][
            Html.label [ for "prot" ][ Html.text "Eiweiß" ],
            Html.input [ type_ "number", step "0.1", onInput SetProt, id "prot", value protValue ][]
          ]
        ]
