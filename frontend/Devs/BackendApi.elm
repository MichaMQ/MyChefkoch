module Devs.BackendApi exposing ( .. )

import List exposing (..)

import Http
import Json.Decode as Decode exposing (Decoder, field, succeed)
import Json.Encode as Encode exposing (..)

import Devs.Objects as Objects exposing (..)

import Devs.RecipeDecode as RD exposing (tagtypeDecoder,recipeLightDecoder,recipeDecoder,unitDecoder,sourceDecoder,tagDecoder,partLightDecoder)
import Devs.RecipeEncode as RE exposing (sourceEncoder,recipeEncoder,imageEncoder)

uploadImage: (Result Http.Error (Bool) -> Msg) -> String -> ImagePortData -> Cmd Msg
uploadImage event url image =
  let
    jsonValue = RE.imageEncoder image
--    _ = Debug.log "src-url: " url
  in
--    Http.send event (Http.post url (Http.jsonBody jsonValue) Decode.bool)
    Http.post {url=url, body=(Http.jsonBody jsonValue), expect=Http.expectJson event Decode.bool}

saveRecipe: (Result Http.Error (Recipe) -> Msg) -> String -> Recipe -> Cmd Msg
saveRecipe event url newRecipe =
  let
    jsonValue = RE.recipeEncoder newRecipe
--    _ = Debug.log "src-url: " url
  in
--    Http.send event (Http.post url (Http.jsonBody jsonValue) recipeDecoder)
    Http.post {url=url, body=(Http.jsonBody jsonValue), expect=Http.expectJson event recipeDecoder}

saveSource: (Result Http.Error (Source) -> Msg) -> String -> Source -> Cmd Msg
saveSource event url newSource =
  let
    jsonValue = RE.sourceEncoder newSource
--    _ = Debug.log "src-url: " url
  in
--    Http.send event (Http.post url (Http.jsonBody jsonValue) sourceDecoder)
    Http.post {url=url, body=(Http.jsonBody jsonValue), expect=Http.expectJson event sourceDecoder}

getAllUnits: (Result Http.Error (List Unit) -> Msg) -> String -> Cmd Msg
--getAllUnits event url = Http.send event (Http.get url (Decode.list RD.unitDecoder))
getAllUnits event url = Http.get {url=url, expect=Http.expectJson event (Decode.list RD.unitDecoder)}

getAllSources: (Result Http.Error (List Source) -> Msg) -> String -> Cmd Msg
--getAllSources event url = Http.send event (Http.get url (Decode.list RD.sourceDecoder))
getAllSources event url = Http.get {url=url, expect=Http.expectJson event (Decode.list RD.sourceDecoder)}

getAllTags: (Result Http.Error (List Tag) -> Msg) -> String -> Cmd Msg
--getAllTags event url = Http.send event (Http.get url (Decode.list RD.tagDecoder))
getAllTags event url = Http.get {url=url, expect=Http.expectJson event (Decode.list RD.tagDecoder)}

getAllParts: (Result Http.Error (List PartLight) -> Msg) -> String -> Cmd Msg
getAllParts event url = Http.get {url=url, expect=Http.expectJson event (Decode.list RD.partLightDecoder)}

getTagtypeListForOverview: (Result Http.Error (List Tagtype) -> Msg) -> String -> Cmd Msg
--getTagtypeListForOverview event url = Http.send event (Http.get url (Decode.list RD.tagtypeDecoder))
getTagtypeListForOverview event url = Http.get {url=url, expect=Http.expectJson event (Decode.list RD.tagtypeDecoder)}

getRecipeListForTag : (Result Http.Error (List RecipeLight) -> Msg) -> String -> Cmd Msg
--getRecipeListForTag event url = Http.send event (Http.get url (Decode.list RD.recipeLightDecoder))
getRecipeListForTag event url = Http.get {url=url, expect=Http.expectJson event (Decode.list RD.recipeLightDecoder)}

searchRecipe: (Result Http.Error (List RecipeLight) -> Msg) -> String -> Cmd Msg
--searchRecipe event url = Http.send event (Http.get url (Decode.list RD.recipeLightDecoder))
searchRecipe event url = Http.get {url=url, expect=Http.expectJson event (Decode.list RD.recipeLightDecoder)}

getRecipe: (Result Http.Error (Recipe) -> Msg) -> String -> Cmd Msg
--getRecipe event url = Http.send event (Http.get url RD.recipeDecoder)
getRecipe event url = Http.get {url=url, expect=Http.expectJson event RD.recipeDecoder}

login: (Result Http.Error (String) -> Msg) -> String -> Cmd Msg
login event url = Http.get {url=url, expect=Http.expectString event}
