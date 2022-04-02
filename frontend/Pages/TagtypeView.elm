module Pages.TagtypeView exposing(viewInitialTagtypeList)

import Html exposing (..)
import Html.Attributes as Attr
import Html.Events as Ev
import List

import Devs.Objects as O
import Devs.TypeObject as TO exposing (Msg)
-- View


viewInitialTagtypeList: O.Model -> Html Msg
viewInitialTagtypeList model = Html.div [ Attr.id "contentDiv", Attr.class "cf" ] (listInitialTagtypeList model)

listInitialTagtypeList : O.Model -> List (Html Msg)
listInitialTagtypeList model =
    case model.tagtypeList of
        Just tagtypeList -> List.map viewInitialTagtype (List.sortBy .name tagtypeList)
        Nothing -> [Html.text ""]

viewInitialTagtype: O.Tagtype -> Html Msg
viewInitialTagtype tagtype =
  Html.div [ Attr.id "categoryTypeDiv" ][
    Html.h3 [][ Html.text tagtype.name ],
    Html.div [ Attr.id "categoryDiv" ] (List.map viewInitialTag tagtype.tagList)
  ]

viewInitialTag: O.Tag -> Html Msg
viewInitialTag tag =
  let
    tag_id = case tag.id of
        Just id -> id
        Nothing -> -1
  in
    Html.button [
      Attr.id (String.fromInt tag_id),
      Attr.class "tagLink",
      Ev.onClick (TO.ShowRecipesOfTag (Just tag))
    ][ Html.text tag.name ]
