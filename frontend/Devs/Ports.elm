port module Devs.Ports exposing (..)

import Devs.Objects as Objects exposing (..)

port fileSelected : String -> Cmd msg

port fileContentRead : (ImagePortData -> msg) -> Sub msg
