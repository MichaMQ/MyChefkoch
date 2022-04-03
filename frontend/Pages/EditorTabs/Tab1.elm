module Pages.EditorTabs.Tab1 exposing(showTab)

import Html exposing (..)
import Html.Extra as Html
import Html.Attributes as Attr
import Html.Events as Ev
import Html.Events.Extra as Ev
import List as List
import Json.Decode as Json

import Devs.Objects as O
import Devs.TypeObject as TO
import Pages.Utils as PU
-- View

showTab: O.Model -> Html TO.Msg
showTab model =
  let
    mod_rec = case model.selectedRecipe of
      Just rec -> rec
      Nothing -> O.getEmptyRecipe
    initialSrcList = case model.kl.sourceList of
      Just src -> src
      Nothing -> []
    translateValue = case mod_rec.translate of
      Just val -> val
      Nothing -> ""
    numberValue = case mod_rec.number of
      Just val -> String.fromInt val
      Nothing -> ""
    sourcePageValue = case mod_rec.source_page of
      Just val -> String.fromInt val
      Nothing -> ""
    numberCommentValue = case mod_rec.number_comment of
      Just val -> val
      Nothing -> ""
    idValue = case mod_rec.id of
      Just val -> String.fromInt val
      Nothing -> ""
    sourceValue = case mod_rec.source of
      Just val -> val
      Nothing -> O.getEmptySource
    carbohydratesValue = case mod_rec.nv_carbohydrates of
      Just val -> String.fromFloat val
      Nothing -> ""
    fatValue = case mod_rec.nv_fat of
      Just val -> String.fromFloat val
      Nothing -> ""
    proteinValue = case mod_rec.nv_protein of
      Just val -> String.fromFloat val
      Nothing -> ""
    energyValue = case mod_rec.nv_energy of
      Just val -> String.fromFloat val
      Nothing -> ""
    imgValue = case mod_rec.image of
      Just val -> val
      Nothing -> ""
  in
        Html.div[ Attr.class "showTabContent" ][
          Html.div[ Attr.style "float" "left" ][
            Html.div[][
              Html.label [ Attr.for "id" ][ Html.text "ID" ],
              Html.input [ Attr.type_ "text", Attr.id "id", Attr.value idValue, Attr.disabled True ][]
            ],
            Html.div[][
              Html.label [ Attr.for "name" ][ Html.text "Name *" ],
              Html.input [ Attr.type_ "text", Attr.autofocus True, Ev.onInput TO.SetName, Attr.id "name", Attr.value mod_rec.name ][]
            ],
            Html.div[][
              Html.label [ Attr.for "translate" ][ Html.text "Übersetzung" ],
              Html.input [ Attr.type_ "text", Ev.onInput TO.SetTranslate, Attr.id "translate", Attr.value translateValue ][]
            ],
            Html.div[][
              Html.label [ Attr.for "number" ][ Html.text "Portionen" ],
              Html.input [ Attr.type_ "number", Ev.onInput TO.SetNumber, Attr.id "number", Attr.value numberValue ][]
            ],
            Html.div[][
              Html.label [ Attr.for "number_comment" ][ Html.text "Port.-Kom." ],
              Html.input [ Attr.type_ "text", Ev.onInput TO.SetNumberComment, Attr.id "number_comment", Attr.value numberCommentValue ][]
            ],
            Html.div[][
              Html.label [ Attr.for "source" ][ Html.text "Quelle *" ],
              Html.select [ Attr.id "source", Ev.onChange TO.SetSource ] (List.append [PU.getSelectOption](List.map (showSourceOption sourceValue) (List.sortBy .name initialSrcList))),
              Html.button [ Ev.onClick TO.AddNewSource ][ Html.text "+" ]
            ],
            Html.div[][
              Html.label [ Attr.for "source_page" ][ Html.text "Seitenangabe" ],
              Html.input [ Attr.type_ "number", Ev.onInput TO.SetSourcePage, Attr.id "source_page", Attr.value sourcePageValue ][]
            ]
            , Html.div[][
              Html.label [ Attr.for "nv_energy" ][ Html.text "Kalorien" ],
              Html.input [ Attr.type_ "number", Ev.onInput TO.SetEnergy, Attr.placeholder "in kCal pro Portion", Attr.step "0.1", Attr.id "nv_energy", Attr.value energyValue ][]
            ]
            , Html.div[][
              Html.label [ Attr.for "nv_carbohydrates" ][ Html.text "Kohlenhydrate" ],
              Html.input [ Attr.type_ "number", Ev.onInput TO.SetCarbo, Attr.placeholder "in g pro Portion", Attr.step "0.1", Attr.id "nv_carbohydrates", Attr.value carbohydratesValue ][]
            ]
            , Html.div[][
              Html.label [ Attr.for "nv_fat" ][ Html.text "Fett" ],
              Html.input [ Attr.type_ "number", Ev.onInput TO.SetFat, Attr.placeholder "in g pro Portion", Attr.step "0.1", Attr.id "nv_fat", Attr.value fatValue ][]
            ]
            , Html.div[][
              Html.label [ Attr.for "nv_protein" ][ Html.text "Eiweiß" ],
              Html.input [ Attr.type_ "number", Ev.onInput TO.SetProt, Attr.placeholder "in g pro Portion", Attr.step "0.1", Attr.id "nv_protein", Attr.value proteinValue ][]
            ]
            {-
            , Html.div[](
              List.append
                [Html.label [ Attr.for "image" ][ Html.text "Bild" ]]
                (getImageField model mod_rec)
              )
              -}
          ],
          (viewImagePreview model.recImage mod_rec.image)
        ]

viewImagePreview : Maybe O.ImagePortData -> Maybe String -> Html TO.Msg
viewImagePreview image base64Img =
  case image of
    Just img -> Html.figure [][ Html.img[ Attr.src img.contents, Attr.title img.filename ][] ]
    Nothing -> case base64Img of
      Just imgSrc -> if String.startsWith "/" imgSrc
        then Html.div[Attr.style "display" "inline-block"][Html.figure [][ Html.img[ Attr.class "recipeImg", Attr.src ("data:image/jpeg;base64," ++ imgSrc) ][] ]]
        else Html.nothing
      Nothing -> Html.nothing

getImageField: O.Model -> O.Recipe -> List (Html TO.Msg)
getImageField model rec =
  let
    field = case rec.image of
      Just imgValue -> [
        Html.input [ Attr.type_ "text", Attr.id "image", Attr.value imgValue, Attr.disabled True ][],
        Html.button [ Ev.onClick TO.RemoveImageFromRecipe ][ Html.text "-" ]]
      Nothing -> [Html.input [ Attr.class "fileUploadInput", Ev.on "change" (Json.succeed TO.ImageSelected), Attr.type_ "file", Attr.id "recImage", Attr.accept "image/*" ][]]
  in
    field

showSourceOption: O.Source -> O.Source -> Html TO.Msg
showSourceOption selectedValue src =
  let
    src_year = case src.year of
      Just year -> " (" ++ year ++ ")"
      Nothing -> ""
    selectedVal = if src.uuid == selectedValue.uuid
      then True
      else False
  in
    Html.option[ Attr.value (src.uuid), Attr.selected selectedVal ][ Html.text (src.name ++ src_year) ]
