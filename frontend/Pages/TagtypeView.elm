module Pages.TagtypeView exposing(viewInitialTagtypeList)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick, onInput)
import List exposing (..)

import Devs.Objects as Objects exposing (..)
-- View


viewInitialTagtypeList: Model -> Html Msg
viewInitialTagtypeList model = Html.div [ id "contentDiv", class "cf" ] (listInitialTagtypeList model)

listInitialTagtypeList : Model -> List (Html Msg)
listInitialTagtypeList model =
    case model.tagtypeList of
        Just tagtypeList -> List.map viewInitialTagtype tagtypeList
        Nothing -> [Html.text ""]

viewInitialTagtype: Tagtype -> Html Msg
viewInitialTagtype tagtype =
  Html.div [ id "categoryTypeDiv" ][
    Html.h3 [][ Html.text tagtype.name ],
    Html.div [ id "categoryDiv" ] (List.map viewInitialTag tagtype.tagList)
  ]

viewInitialTag: Tag -> Html Msg
viewInitialTag tag =
  let
    tag_id = case tag.id of
        Just id -> id
        Nothing -> -1
  in
    Html.button [
      id (String.fromInt tag_id),
      class "tagLink",
      onClick (ShowRecipesOfTag (Just tag))
    ][ Html.text tag.name ]
