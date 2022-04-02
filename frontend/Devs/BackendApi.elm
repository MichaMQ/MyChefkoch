module Devs.BackendApi exposing ( .. )

import List exposing (..)

import Http
import Json.Decode as Decode exposing (..)
import Json.Encode as Encode exposing (..)

import Devs.Objects as O
import Devs.TypeObject as TO

import Debug

import Devs.RecipeDecode as RD
import Devs.RecipeEncode as RE

uploadImage: (Result Http.Error (Bool) -> TO.Msg) -> Maybe O.Session -> String -> O.ImagePortData -> Cmd TO.Msg
uploadImage event session url image =
  let
    jsonValue = RE.imageEncoder image
  in
    --Http.post {url=url, body=(Http.jsonBody jsonValue), expect=Http.expectJson event Decode.bool}
    myRequest "POST" url (Http.expectJson event Decode.bool) session (Just jsonValue)

saveRecipe: (Result Http.Error (O.Recipe) -> TO.Msg) -> Maybe O.Session -> String -> O.Recipe -> Cmd TO.Msg
saveRecipe event session url newRecipe =
  let
    jsonValue = RE.recipeEncoder newRecipe
    logString = Encode.encode 0 jsonValue
    _ = Debug.log "newRecipe: " logString
  in
    --Http.post {url=url, body=(Http.jsonBody jsonValue), expect=Http.expectJson event recipeDecoder}
    myRequest "POST" url (Http.expectJson event RD.recipeDecoder) session (Just jsonValue)

saveSource: (Result Http.Error (O.Source) -> TO.Msg) -> Maybe O.Session -> String -> O.Source -> Cmd TO.Msg
saveSource event session url newSource =
  let
    jsonValue = RE.sourceEncoder newSource

  in
    --Http.post {url=url, body=(Http.jsonBody jsonValue), expect=Http.expectJson event sourceDecoder}
    myRequest "POST" url (Http.expectJson event RD.sourceDecoder) session (Just jsonValue)

getAllUnits: (Result Http.Error (List O.Unit) -> TO.Msg) -> Maybe O.Session -> String -> Cmd TO.Msg
getAllUnits event session url = myRequest "GET" url (Http.expectJson event (Decode.list RD.unitDecoder)) session Nothing

getAllSources: (Result Http.Error (List O.Source) -> TO.Msg) -> Maybe O.Session -> String -> Cmd TO.Msg
getAllSources event session url = myRequest "GET" url (Http.expectJson event (Decode.list RD.sourceDecoder)) session Nothing

getAllTags: (Result Http.Error (List O.Tag) -> TO.Msg) -> Maybe O.Session -> String -> Cmd TO.Msg
getAllTags event session url = myRequest "GET" url (Http.expectJson event (Decode.list RD.tagDecoder)) session Nothing

getAllParts: (Result Http.Error (List O.PartLight) -> TO.Msg) -> Maybe O.Session -> String -> Cmd TO.Msg
getAllParts event session url = myRequest "GET" url (Http.expectJson event (Decode.list RD.partLightDecoder)) session Nothing

getTagtypeListForOverview: (Result Http.Error (List O.Tagtype) -> TO.Msg) -> Maybe O.Session -> String -> Cmd TO.Msg
getTagtypeListForOverview event session url = myRequest "GET" url (Http.expectJson event (Decode.list RD.tagtypeDecoder)) session Nothing

getRecipeListForTag : (Result Http.Error (List O.RecipeLight) -> TO.Msg) -> Maybe O.Session -> String -> Cmd TO.Msg
getRecipeListForTag event session url = myRequest "GET" url (Http.expectJson event (Decode.list RD.recipeLightDecoder)) session Nothing

searchRecipe: (Result Http.Error (List O.RecipeLight) -> TO.Msg) -> Maybe O.Session -> String -> Cmd TO.Msg
searchRecipe event session url = myRequest "GET" url (Http.expectJson event (Decode.list RD.recipeLightDecoder)) session Nothing

getRecipe: (Result Http.Error (O.Recipe) -> TO.Msg) -> Maybe O.Session -> String -> Cmd TO.Msg
getRecipe event session url = myRequest "GET" url (Http.expectJson event RD.recipeDecoder) session Nothing

login: (Result Http.Error (O.Session) -> TO.Msg) -> String -> Cmd TO.Msg
login event url = myRequest "GET" url (Http.expectJson event RD.sessionDecoder) Nothing Nothing
--login event url = Http.get {url=url, expect=Http.expectString event}

myRequest: String -> String -> (Http.Expect TO.Msg) -> Maybe O.Session -> Maybe Encode.Value -> Cmd TO.Msg
myRequest method url expect session content =
  let
      header = case session of
        Just reqSession -> if String.length reqSession.account.token > 0
          then [(Http.header "session" reqSession.account.token)]
          else []
        Nothing -> []
      body = case content of
        Just reqBody -> Http.jsonBody reqBody
        Nothing -> Http.emptyBody
  in
     Http.request -- This line is missing from your code
      { method = method
      , headers = header
      , url = url
      , body = body
      , expect = expect
      , timeout = Nothing
      , tracker = Nothing
      }
