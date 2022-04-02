module RecipeServer exposing (..)

--elm make --debug RecipeServer.elm --output=pub/js/RecipeServer.js

import Devs.Ports as Ports

import Browser
import Html
import Devs.Objects as O
import Devs.Update as U
import Devs.TypeObject as TO

import Pages.OverViewPage as OVP
import Pages.Utils as PU

--import Debug exposing (log)

-- View
view : O.Model -> Html.Html TO.Msg
view model =
    let
        _ =
            [
              Html.h1 [][ Html.text "RecipeServer" ]
            ]

        alertMsg = if model.alertMessage /= Nothing then PU.alert TO.CloseAlert model.alertMessage model
          else if model.recAlertMessage /= Nothing then PU.alert TO.CloseAlert model.recAlertMessage model
          else Html.div [][]
    in
      OVP.viewOverview model alertMsg

main : Program () O.Model TO.Msg
main =
    Browser.element
        { init = \() -> init
        , view = view
        , update = U.update
        , subscriptions = subscriptions
        }

subscriptions : O.Model -> Sub TO.Msg
subscriptions _ = Sub.batch [ Ports.fileContentRead TO.ImageRead, Ports.initialize TO.Initialize ]

init : ( O.Model, Cmd TO.Msg )
init =  ( O.initialModel, Cmd.none )
