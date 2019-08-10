module Pages.Utils exposing(alert, getSelectOption, getConfirmForm, onEnter)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (keyCode, on, onClick, onInput)
import Json.Decode as Json exposing ( .. )

import Devs.Objects as O exposing (..)
import Devs.TypeObject as TO exposing (Msg)

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
