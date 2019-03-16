port module RecipeServer exposing (..)

import Devs.Ports as Ports exposing (fileContentRead)

import Browser exposing (..)
import Html exposing (..)
import Devs.Objects as Objects exposing (..)
import Devs.Update as Update exposing (..)

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
            PU.alert CloseAlert model.alertMessage model
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
subscriptions model = Ports.fileContentRead ImageRead

init : ( Model, Cmd Msg )
init =  ( initialModel, Cmd.batch [ Update.getTagtypeListForOverview initialModel, Update.getAllUnits initialModel, Update.getAllSources initialModel, Update.getAllTags initialModel ] )
