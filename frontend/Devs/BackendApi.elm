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

uploadImage: (Result Http.Error (Bool) -> TO.Msg) -> Maybe String -> String -> O.ImagePortData -> Cmd TO.Msg
uploadImage event token url image =
  let
    jsonValue = RE.imageEncoder image
  in
    --Http.post {url=url, body=(Http.jsonBody jsonValue), expect=Http.expectJson event Decode.bool}
    myRequest "POST" url (Http.expectJson event Decode.bool) token (Just jsonValue)

saveRecipe: (Result Http.Error (O.Recipe) -> TO.Msg) -> Maybe String -> String -> O.Recipe -> Cmd TO.Msg
saveRecipe event token url newRecipe =
  let
    jsonValue = RE.recipeEncoder newRecipe
    logString = Encode.encode 0 jsonValue
    _ = Debug.log "newRecipe: " logString
  in
    --Http.post {url=url, body=(Http.jsonBody jsonValue), expect=Http.expectJson event recipeDecoder}
    myRequest "POST" url (Http.expectJson event RD.recipeDecoder) token (Just jsonValue)

saveSource: (Result Http.Error (O.Source) -> TO.Msg) -> Maybe String -> String -> O.Source -> Cmd TO.Msg
saveSource event token url newSource =
  let
    jsonValue = RE.sourceEncoder newSource

  in
    --Http.post {url=url, body=(Http.jsonBody jsonValue), expect=Http.expectJson event sourceDecoder}
    myRequest "POST" url (Http.expectJson event RD.sourceDecoder) token (Just jsonValue)

getAllUnits: (Result Http.Error (List O.Unit) -> TO.Msg) -> Maybe String -> String -> Cmd TO.Msg
getAllUnits event token url = myRequest "GET" url (Http.expectJson event (Decode.list RD.unitDecoder)) token Nothing

getAllSources: (Result Http.Error (List O.Source) -> TO.Msg) -> Maybe String -> String -> Cmd TO.Msg
getAllSources event token url = myRequest "GET" url (Http.expectJson event (Decode.list RD.sourceDecoder)) token Nothing

getAllTags: (Result Http.Error (List O.Tag) -> TO.Msg) -> Maybe String -> String -> Cmd TO.Msg
getAllTags event token url = myRequest "GET" url (Http.expectJson event (Decode.list RD.tagDecoder)) token Nothing

getAllParts: (Result Http.Error (List O.PartLight) -> TO.Msg) -> Maybe String -> String -> Cmd TO.Msg
getAllParts event token url = myRequest "GET" url (Http.expectJson event (Decode.list RD.partLightDecoder)) token Nothing

getTagtypeListForOverview: (Result Http.Error (List O.Tagtype) -> TO.Msg) -> Maybe String -> String -> Cmd TO.Msg
getTagtypeListForOverview event token url = myRequest "GET" url (Http.expectJson event (Decode.list RD.tagtypeDecoder)) token Nothing

getRecipeListForTag : (Result Http.Error (List O.RecipeLight) -> TO.Msg) -> Maybe String -> String -> Cmd TO.Msg
getRecipeListForTag event token url = myRequest "GET" url (Http.expectJson event (Decode.list RD.recipeLightDecoder)) token Nothing

searchRecipe: (Result Http.Error (List O.RecipeLight) -> TO.Msg) -> Maybe String -> String -> Cmd TO.Msg
searchRecipe event token url = myRequest "GET" url (Http.expectJson event (Decode.list RD.recipeLightDecoder)) token Nothing

getRecipe: (Result Http.Error (O.Recipe) -> TO.Msg) -> Maybe String -> String -> Cmd TO.Msg
getRecipe event token url = myRequest "GET" url (Http.expectJson event RD.recipeDecoder) token Nothing

login: (Result Http.Error (String) -> TO.Msg) -> String -> Cmd TO.Msg
login event url = Http.get {url=url, expect=Http.expectString event}

myRequest: String -> String -> (Http.Expect TO.Msg) -> Maybe String -> Maybe Encode.Value -> Cmd TO.Msg
myRequest method url expect token content =
  let
      header = case token of
        Just reqToken -> if String.length reqToken > 0
          then [(Http.header "token" reqToken)]
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
