module Pages.Utils exposing(alert, getSelectOption, getConfirmForm, onEnter, getEditButton, getEditHeader)

import Html exposing (..)
import Html.Attributes as Attr
import Html.Events as Ev
import Json.Decode as Json
import List

import Devs.Objects as O
import Devs.TypeObject as TO

getEditHeader: Bool -> String -> TO.Msg -> Html TO.Msg
getEditHeader isLoggedIn headerTxt event =
  if isLoggedIn
    then Html.span [
      Ev.onClick event
      , Attr.class "editHeader"
    ][ Html.text headerTxt ]
    else Html.text headerTxt

getEditButton: O.ServerParams -> Maybe Bool -> String -> Maybe String -> TO.Msg -> List (Html.Attribute TO.Msg) -> Html TO.Msg
getEditButton sp isLoggedIn bntImg link event styles =
  let
    btn = case link of
      Just href -> Html.a (List.append styles [ Attr.class "amazonLink", Attr.target "_blank", Attr.href href ])[ Html.img[ Attr.src (sp.iconPath ++ bntImg), Attr.height 20 ][] ]
      Nothing -> Html.button (List.append styles [ Ev.onClick event ])[ Html.img[ Attr.src (sp.iconPath ++ bntImg), Attr.height 20 ][] ]
    showBtn = case isLoggedIn of
        Just bool -> bool
        Nothing -> False
  in
    if showBtn
      then btn
      else Html.text ""

alert : msg -> Maybe String -> O.Model -> Html msg
alert event alertMsg model =
    case alertMsg of
        Just message ->
            Html.div [ Attr.class "alert" ] [
              Html.span [ Attr.class "close", Ev.onClick event ] [ Html.img[ Attr.class "editIcon", Attr.src (model.sp.iconPath ++ "close.png"), Attr.alt "close message"][] ]
              , Html.text message
            ]

        Nothing ->
            Html.text ""

getSelectOption: Html TO.Msg
getSelectOption = Html.option[ ][ Html.text "Bitte wählen" ]

getConfirmForm: TO.Msg -> TO.Msg -> String -> Html TO.Msg
getConfirmForm yesEvent noEvent msg =
  Html.div [ Attr.class "editFormBG" ][
    Html.div [ Attr.class "confirmFormDiv" ] [
      Html.div [ Attr.class "confirmMsgDiv" ][ Html.text msg ],
      Html.div [ Attr.class "confirmFormActionDiv" ][
        Html.button [ Ev.onClick yesEvent ][ Html.text "ja" ],
        Html.button [ Ev.onClick noEvent ][ Html.text "nein" ]
      ]
    ]
  ]


onEnter : TO.Msg -> Attribute TO.Msg
onEnter msg =
    let
        isEnter code =
            if code == 13 then
                Json.succeed msg
            else
                Json.fail "not ENTER"
    in
        Ev.on "keydown" (Json.andThen isEnter Ev.keyCode)
