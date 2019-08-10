port module RecipeServer exposing (..)

--elm make --debug RecipeServer.elm --output=pub/js/RecipeServer.js

import Devs.Ports as Ports exposing (fileContentRead)

import Browser exposing (..)
import Html exposing (..)
import Devs.Objects as O exposing (..)
import Devs.Update as U exposing (..)
import Devs.TypeObject as TO exposing (Msg)

import Pages.OverViewPage as OVP exposing (viewOverview)
import Pages.Utils as PU exposing (alert)

import Debug exposing (log)

-- View
view : Model -> Html Msg
view model =
    let
        appHeader =
            [
              Html.h1 [][ Html.text "RecipeServer" ]
            ]

        alertMsg =
            PU.alert TO.CloseAlert model.alertMessage model
    in
      OVP.viewOverview model alertMsg

main : Program () Model Msg
main =
    Browser.element
        { init = \() -> init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }

subscriptions : Model -> Sub Msg
subscriptions model = Ports.fileContentRead TO.ImageRead

init : ( Model, Cmd Msg )
init =  ( initialModel, Cmd.batch [ U.getTagtypeListForOverview initialModel, U.getAllUnits initialModel, U.getAllSources initialModel, U.getAllTags initialModel, U.getAllParts initialModel ] )
