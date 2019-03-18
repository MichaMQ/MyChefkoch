module Pages.EditorTabs.Tab2 exposing(showTab, showTagOption)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick, onInput, on)
import List exposing (..)
import Tuple exposing (..)

import Devs.Objects as Objects exposing (..)
-- View

showTab: Model -> Html Msg
showTab model =
  let
    tab2Class = if model.selectedTab == "Tab2" then "showTabContent" else "hideTabContent"
    recForEdit = case model.recipeForEdit of
      Just rec -> rec
      Nothing -> Objects.getEmptyRecipe
    tagListValue = case recForEdit.tags of
      Just tagList -> tagList
      Nothing -> []
    initialTagList = case model.kl.tagList of
      Just tags -> tags
      Nothing -> []
  in
        Html.div[ class tab2Class ] [
          Html.div[][
            Html.table [ ]( List.map (showTagDiv initialTagList) (indexedMap Tuple.pair (sortBy .name tagListValue)) )
          ],
          Html.div[][
            Html.button [ onClick ChooseNewTag ][ Html.text "Tag hinzufügen" ]
            --,Html.button [][ Html.text "+" ]
          ]
        ]

showTagDiv: List Tag -> (Int, Tag) -> Html Msg
showTagDiv initialTagList tagObj =
  let
    idx = first tagObj
    tag = second tagObj
  in
    Html.tr[][
      Html.td[][ Html.text (tag.name ++ " (" ++ tag.tagType.name ++ ")") ],
      Html.td[][ Html.button [ onClick (RemoveTagFromRec idx) ][ Html.text "-" ] ]
    ]

showTagOption: Tag -> Tag -> Html Msg
showTagOption tagListValue tag =
  let
    selectedVal = if tagListValue.id == tag.id then True else False
    tagId = case tag.id of
      Just id -> String.fromInt id
      Nothing -> ""
  in
    Html.option[ value tagId, selected selectedVal ][ Html.text (tag.name ++ " (" ++ tag.tagType.name ++ ")") ]
