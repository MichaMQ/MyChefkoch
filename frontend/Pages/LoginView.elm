module Pages.LoginView exposing(getLoginForm)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick, onInput)

import Devs.Objects as Objects exposing (..)
import Pages.Utils as PU exposing (alert, onEnter)
-- View

getLoginForm: Model -> Html Msg
getLoginForm model =
  Html.div [ class "editFormBG" ][
    Html.div [ class "editFormDiv" ] [
      Html.div[][
        Html.label [ for "id" ][ Html.text "Passwort" ],
        Html.input [ type_ "password", autofocus True, onInput SetPasswortForCheck, PU.onEnter Login ][]
      ], PU.alert CloseLoginAlert model.subAlertMessage model,
      Html.div [ class "editFormActionDiv" ][
        Html.button [ onClick Login ][ Html.text "login" ],
        Html.button [ onClick CancelLogin ][ Html.text "abbrechen" ]
      ]
    ]
  ]

showSourceOption: Source -> Html Msg
showSourceOption src =
  let
    src_year = case src.year of
      Just year -> " (" ++ year ++ ")"
      Nothing -> ""
    src_id = case src.id of
        Just id -> id
        Nothing -> -1
  in
    Html.option[ value (String.fromInt src_id) ][ Html.text (src.name ++ src_year) ]

getSelectOption: Html Msg
getSelectOption = Html.option[ ][ Html.text "Bitte wählen" ]
