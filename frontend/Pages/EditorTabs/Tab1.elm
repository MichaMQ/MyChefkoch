module Pages.EditorTabs.Tab1 exposing(showTab)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick, onInput, on)
import List exposing (..)
import Json.Decode as Json

import Html.Events.Extra exposing (targetValueIntParse)

import Devs.Objects as Objects exposing (..)
import Devs.TypeObject as TO exposing (Msg)
import Pages.Utils as PU exposing (getSelectOption)
-- View

showTab: Model -> Html Msg
showTab model =
  let
    mod_rec = case model.selectedRecipe of
      Just rec -> rec
      Nothing -> Objects.getEmptyRecipe
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
      Nothing -> Objects.getEmptySource
    imgValue = case mod_rec.image of
      Just val -> val
      Nothing -> ""
  in
        Html.div[ class "showTabContent" ][
          Html.div[ style "float" "left" ][
            Html.div[][
              Html.label [ for "id" ][ Html.text "ID" ],
              Html.input [ type_ "text", id "id", value idValue, disabled True ][]
            ],
            Html.div[][
              Html.label [ for "name" ][ Html.text "Name *" ],
              Html.input [ type_ "text", autofocus True, onInput TO.SetName, id "name", value mod_rec.name ][]
            ],
            Html.div[][
              Html.label [ for "translate" ][ Html.text "Übersetzung" ],
              Html.input [ type_ "text", onInput TO.SetTranslate, id "translate", value translateValue ][]
            ],
            Html.div[][
              Html.label [ for "number" ][ Html.text "Portionen" ],
              Html.input [ type_ "number", onInput TO.SetNumber, id "number", value numberValue ][]
            ],
            Html.div[][
              Html.label [ for "number_comment" ][ Html.text "Port.-Kom." ],
              Html.input [ type_ "text", onInput TO.SetNumberComment, id "number_comment", value numberCommentValue ][]
            ],
            Html.div[][
              Html.label [ for "source" ][ Html.text "Quelle *" ],
              Html.select [ id "source", on "change" (Json.map TO.SetSource targetValueIntParse) ] (List.append [PU.getSelectOption](List.map (showSourceOption sourceValue) (sortBy .name initialSrcList))),
              Html.button [ onClick TO.AddNewSource ][ Html.text "+" ]
            ],
            Html.div[][
              Html.label [ for "source_page" ][ Html.text "Seitenangabe" ],
              Html.input [ type_ "number", onInput TO.SetSourcePage, id "source_page", value sourcePageValue ][]
            ],
            Html.div[](
              List.append
                [Html.label [ for "image" ][ Html.text "Bild" ]]
                (getImageField model mod_rec)
              )
          ],
          (viewImagePreview model.recImage)
        ]

viewImagePreview : Maybe ImagePortData -> Html Msg
viewImagePreview image =
  case image of
    Just img -> Html.figure [][ Html.img[ src img.contents, title img.filename ][] ]
    Nothing -> Html.text ""

getImageField: Model -> Recipe -> List (Html Msg)
getImageField model rec =
  let
    field = case rec.image of
      Just imgValue -> [
        Html.input [ type_ "text", id "image", value imgValue, disabled True ][],
        Html.button [ onClick TO.RemoveImageFromRecipe ][ Html.text "-" ]]
      Nothing -> [Html.input [ class "fileUploadInput", on "change" (Json.succeed TO.ImageSelected), type_ "file", id "recImage", accept "image/*" ][]]
  in
    field

showSourceOption: Source -> Source -> Html Msg
showSourceOption selectedValue src =
  let
    src_year = case src.year of
      Just year -> " (" ++ year ++ ")"
      Nothing -> ""
    selectedVal = if src.id == selectedValue.id
      then True
      else False
    srcId = case src.id of
      Just id -> String.fromInt id
      Nothing -> ""
  in
    Html.option[ value (srcId), selected selectedVal ][ Html.text (src.name ++ src_year) ]
