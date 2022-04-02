module Pages.LoginView exposing(getLoginForm)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick, onInput)

import Devs.Objects as O
import Devs.TypeObject as TO
import Pages.Utils as PU
-- View

getLoginForm: O.Model -> Html TO.Msg
getLoginForm model =
  Html.div [ class "editFormBG" ][
    Html.div [ class "editFormDiv" ] [
      Html.div[][
        Html.label [ for "username" ][ Html.text "Benutzername" ],
        Html.input [ id "username", type_ "text", autofocus True, onInput TO.SetUsernameForCheck, PU.onEnter TO.Login ][]
      ],
      Html.div[][
        Html.label [ for "password" ][ Html.text "Passwort" ],
        Html.input [ id "password", type_ "password", onInput TO.SetPasswortForCheck, PU.onEnter TO.Login ][]
      ], PU.alert TO.CloseLoginAlert model.subAlertMessage model,
      Html.div [ class "editFormActionDiv" ][
        Html.button [ onClick TO.Login ][ Html.text "login" ],
        Html.button [ onClick TO.CancelLogin ][ Html.text "abbrechen" ]
      ]
    ]
  ]

showSourceOption: O.Source -> Html TO.Msg
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

getSelectOption: Html TO.Msg
getSelectOption = Html.option[ ][ Html.text "Bitte wählen" ]
