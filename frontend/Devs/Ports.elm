port module Devs.Ports exposing (..)

import Devs.Objects as Objects exposing (..)

-- Outgoing
port fileSelected : String -> Cmd msg

-- Incoming
port fileContentRead : (ImagePortData -> msg) -> Sub msg
port initialize : (InitData -> msg) -> Sub msg
