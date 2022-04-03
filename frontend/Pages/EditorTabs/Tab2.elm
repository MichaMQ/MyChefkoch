module Pages.EditorTabs.Tab2 exposing(showTab, showTagOption)

import Html exposing (..)
import Html.Attributes as Attr
import Html.Events as Ev
import Html.Events.Extra as Ev
import List

import Devs.Objects as O
import Devs.TypeObject as TO
-- View

showTab: O.Model -> Html TO.Msg
showTab model =
  let
    recForEdit = case model.selectedRecipe of
      Just rec -> rec
      Nothing -> O.getEmptyRecipe
    initialTagList = case model.kl.tagList of
      Just tags -> tags
      Nothing -> []
  in
        Html.div[ Attr.class "showTabContent" ][
          Html.div[][
            Html.table [ ]( List.map (showTagDiv initialTagList) (List.sortBy .name recForEdit.tags) )
          ],
          Html.div[][
            Html.button [ Ev.onClick TO.ChooseNewTag ][ Html.text "Tag hinzufügen" ]
            --,Html.button [][ Html.text "+" ]
          ]
        ]

showTagDiv: List O.Tag -> O.Tag -> Html TO.Msg
showTagDiv initialTagList tag =
  Html.tr[][
    Html.td[][ Html.text (tag.name ++ " (" ++ tag.tagType.name ++ ")") ],
    Html.td[][ Html.button [ Ev.onClick (TO.DeleteTag tag) ][ Html.text "-" ] ]
  ]

showTagOption: O.Tag -> O.Tag -> Html TO.Msg
showTagOption tagListValue tag =
  let
    selectedVal = if tagListValue.uuid == tag.uuid then True else False
  in
    Html.option[ Attr.value tag.uuid, Attr.selected selectedVal ][ Html.text (tag.name ++ " (" ++ tag.tagType.name ++ ")") ]
