port module Devs.Ports exposing (..)

import Devs.Objects as O

-- Outgoing
port fileSelected : String -> Cmd msg

-- Incoming
port fileContentRead : (O.ImagePortData -> msg) -> Sub msg
port initialize : (O.InitData -> msg) -> Sub msg
