port module RecipeServer exposing (..)

--elm make --debug RecipeServer.elm --output=pub/js/RecipeServer.js

import Devs.Ports as Ports exposing (fileContentRead)

import Browser exposing (element)
import Html exposing (Html,h1,text)
import Devs.Objects as O exposing (Model, initialModel)
import Devs.Update as U exposing (update)
import Devs.Utils as DU exposing (getTagtypeListForOverview,getAllUnits,getAllSources,getAllTags,getAllParts)
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

        alertMsg = if model.alertMessage /= Nothing then PU.alert TO.CloseAlert model.alertMessage model
          else if model.recAlertMessage /= Nothing then PU.alert TO.CloseAlert model.recAlertMessage model
          else Html.div [][]
    in
      OVP.viewOverview model alertMsg

main : Program () Model Msg
main =
    Browser.element
        { init = \() -> init
        , view = view
        , update = U.update
        , subscriptions = subscriptions
        }

subscriptions : Model -> Sub Msg
subscriptions model = Sub.batch [ Ports.fileContentRead TO.ImageRead, Ports.initialize TO.Initialize ]

init : ( Model, Cmd Msg )
init =  ( O.initialModel
  , Cmd.batch [
    DU.getTagtypeListForOverview O.initialModel
    , DU.getAllUnits O.initialModel
    , DU.getAllSources O.initialModel
    , DU.getAllTags O.initialModel
    , DU.getAllParts O.initialModel
  ] )
