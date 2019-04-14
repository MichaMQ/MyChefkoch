module Devs.BackendApi exposing ( .. )

import List exposing (..)

import Http
import Json.Decode as Decode exposing (Decoder, field, succeed)
import Json.Encode as Encode exposing (..)

import Devs.Objects as Objects exposing (..)

import Debug exposing (log)

import Devs.RecipeDecode as RD exposing (tagtypeDecoder,recipeLightDecoder,recipeDecoder,unitDecoder,sourceDecoder,tagDecoder,partLightDecoder)
import Devs.RecipeEncode as RE exposing (sourceEncoder,recipeEncoder,imageEncoder)

uploadImage: (Result Http.Error (Bool) -> Msg) -> Maybe String -> String -> ImagePortData -> Cmd Msg
uploadImage event token url image =
  let
    jsonValue = RE.imageEncoder image
  in
    --Http.post {url=url, body=(Http.jsonBody jsonValue), expect=Http.expectJson event Decode.bool}
    myRequest "POST" url (Http.expectJson event Decode.bool) token (Just jsonValue)

saveRecipe: (Result Http.Error (Recipe) -> Msg) -> Maybe String -> String -> Recipe -> Cmd Msg
saveRecipe event token url newRecipe =
  let
    jsonValue = RE.recipeEncoder newRecipe
    logString = Encode.encode 0 jsonValue
    _ = Debug.log "newRecipe: " logString
  in
    --Http.post {url=url, body=(Http.jsonBody jsonValue), expect=Http.expectJson event recipeDecoder}
    myRequest "POST" url (Http.expectJson event recipeDecoder) token (Just jsonValue)

saveSource: (Result Http.Error (Source) -> Msg) -> Maybe String -> String -> Source -> Cmd Msg
saveSource event token url newSource =
  let
    jsonValue = RE.sourceEncoder newSource

  in
    --Http.post {url=url, body=(Http.jsonBody jsonValue), expect=Http.expectJson event sourceDecoder}
    myRequest "POST" url (Http.expectJson event sourceDecoder) token (Just jsonValue)

getAllUnits: (Result Http.Error (List Unit) -> Msg) -> Maybe String -> String -> Cmd Msg
getAllUnits event token url = myRequest "GET" url (Http.expectJson event (Decode.list RD.unitDecoder)) token Nothing

getAllSources: (Result Http.Error (List Source) -> Msg) -> Maybe String -> String -> Cmd Msg
getAllSources event token url = myRequest "GET" url (Http.expectJson event (Decode.list RD.sourceDecoder)) token Nothing

getAllTags: (Result Http.Error (List Tag) -> Msg) -> Maybe String -> String -> Cmd Msg
getAllTags event token url = myRequest "GET" url (Http.expectJson event (Decode.list RD.tagDecoder)) token Nothing

getAllParts: (Result Http.Error (List PartLight) -> Msg) -> Maybe String -> String -> Cmd Msg
getAllParts event token url = myRequest "GET" url (Http.expectJson event (Decode.list RD.partLightDecoder)) token Nothing

getTagtypeListForOverview: (Result Http.Error (List Tagtype) -> Msg) -> Maybe String -> String -> Cmd Msg
getTagtypeListForOverview event token url = myRequest "GET" url (Http.expectJson event (Decode.list RD.tagtypeDecoder)) token Nothing

getRecipeListForTag : (Result Http.Error (List RecipeLight) -> Msg) -> Maybe String -> String -> Cmd Msg
getRecipeListForTag event token url = myRequest "GET" url (Http.expectJson event (Decode.list RD.recipeLightDecoder)) token Nothing

searchRecipe: (Result Http.Error (List RecipeLight) -> Msg) -> Maybe String -> String -> Cmd Msg
searchRecipe event token url = myRequest "GET" url (Http.expectJson event (Decode.list RD.recipeLightDecoder)) token Nothing

getRecipe: (Result Http.Error (Recipe) -> Msg) -> Maybe String -> String -> Cmd Msg
getRecipe event token url = myRequest "GET" url (Http.expectJson event RD.recipeDecoder) token Nothing

login: (Result Http.Error (String) -> Msg) -> String -> Cmd Msg
login event url = Http.get {url=url, expect=Http.expectString event}

myRequest: String -> String -> (Http.Expect Msg) -> Maybe String -> Maybe Value -> Cmd Msg
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
