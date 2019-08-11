module Pages.Utils exposing(alert, getSelectOption, getConfirmForm, onEnter, getEditButton, getEditHeader)

import Html exposing (..)
import Html.Attributes as Attr exposing (..)
import Html.Events as Ev exposing (keyCode, on, onClick, onInput)
import Json.Decode as Json exposing ( .. )
import List exposing (..)

import Devs.Objects as O exposing (..)
import Devs.TypeObject as TO exposing (Msg)

getEditHeader: Bool -> String -> Msg -> Html Msg
getEditHeader isLoggedIn headerTxt event =
  if isLoggedIn
    then Html.span [
      Ev.onClick event
      , Attr.class "editHeader"
    ][ Html.text headerTxt ]
    else Html.text headerTxt

getEditButton: ServerParams -> Maybe Bool -> String -> Maybe String -> Msg -> List (Html.Attribute Msg) -> Html Msg
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

alert : msg -> Maybe String -> Model -> Html msg
alert event alertMsg model =
    case alertMsg of
        Just message ->
            Html.div [ class "alert" ] [
              Html.span [ class "close", onClick event ] [ Html.img[ class "editIcon", src (model.sp.iconPath ++ "close.png"), alt "close message"][] ]
              , Html.text message
            ]

        Nothing ->
            Html.text ""

getSelectOption: Html Msg
getSelectOption = Html.option[ ][ Html.text "Bitte wählen" ]

getConfirmForm: Msg -> Msg -> String -> Model -> Html Msg
getConfirmForm yesEvent noEvent msg model =
  Html.div [ class "editFormBG" ][
    Html.div [ class "confirmFormDiv" ] [
      Html.div [ class "confirmMsgDiv" ][ Html.text msg ],
      Html.div [ class "confirmFormActionDiv" ][
        Html.button [ onClick yesEvent ][ Html.text "ja" ],
        Html.button [ onClick noEvent ][ Html.text "nein" ]
      ]
    ]
  ]


onEnter : Msg -> Attribute Msg
onEnter msg =
    let
        isEnter code =
            if code == 13 then
                Json.succeed msg
            else
                Json.fail "not ENTER"
    in
        on "keydown" (Json.andThen isEnter keyCode)
