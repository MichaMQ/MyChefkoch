module Pages.EditorTabs.Tab2 exposing(showTab, showTagOption)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick, onInput, on)
import Html.Events.Extra as EvE exposing (onChange)
import List exposing (..)

import Devs.Objects as Objects exposing (..)
import Devs.TypeObject as TO exposing (Msg)
-- View

showTab: Model -> Html Msg
showTab model =
  let
    recForEdit = case model.selectedRecipe of
      Just rec -> rec
      Nothing -> Objects.getEmptyRecipe
    initialTagList = case model.kl.tagList of
      Just tags -> tags
      Nothing -> []
  in
        Html.div[ class "showTabContent" ][
          Html.div[][
            Html.table [ ]( List.map (showTagDiv initialTagList) (sortBy .name recForEdit.tags) )
          ],
          Html.div[][
            Html.button [ onClick TO.ChooseNewTag ][ Html.text "Tag hinzufügen" ]
            --,Html.button [][ Html.text "+" ]
          ]
        ]

showTagDiv: List Tag -> Tag -> Html Msg
showTagDiv initialTagList tag =
  Html.tr[][
    Html.td[][ Html.text (tag.name ++ " (" ++ tag.tagType.name ++ ")") ],
    Html.td[][ Html.button [ onClick (TO.RemoveTagFromRec tag.uuid) ][ Html.text "-" ] ]
  ]

showTagOption: Tag -> Tag -> Html Msg
showTagOption tagListValue tag =
  let
    selectedVal = if tagListValue.uuid == tag.uuid then True else False
  in
    Html.option[ value tag.uuid, selected selectedVal ][ Html.text (tag.name ++ " (" ++ tag.tagType.name ++ ")") ]
