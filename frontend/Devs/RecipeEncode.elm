module Devs.RecipeEncode exposing ( .. )

--import Json.Decode as Decode exposing (Decoder, field, succeed)
--import Json.Decode.Extra exposing (andMap)
import Json.Encode as Encode exposing (..)
--import Json.Encode.Extra as JsonE exposing (..)

import Devs.Objects as O

encodeString: Maybe String -> Encode.Value
encodeString str = case str of
  Just val -> if String.isEmpty val
    then Encode.null
    else Encode.string val
  Nothing -> Encode.null

encodeInt: Maybe Int -> Encode.Value
encodeInt str = case str of
  Just val -> Encode.int val
  Nothing -> Encode.null

encodeFloat: Maybe Float -> Encode.Value
encodeFloat str = case str of
  Just val -> Encode.float val
  Nothing -> Encode.null

imageEncoder: O.ImagePortData -> Encode.Value
imageEncoder img = Encode.object [ ( "contents", Encode.string img.contents )
  , ( "filename", Encode.string img.filename )
  ]

recipeEncoder: O.Recipe -> Encode.Value
recipeEncoder rec =
    let
      list =
          [ ( "id", case rec.id of
            Just val -> Encode.int val
            Nothing -> Encode.null )
          , ( "name", Encode.string rec.name )
          , ( "aikz", Encode.int rec.aikz )
          , ( "image", encodeString rec.image )
          , ( "translate", encodeString rec.translate )
          , ( "number_comment", encodeString rec.number_comment )
          , ( "number", encodeInt rec.number )
          , ( "nv_size", encodeInt rec.nv_size )
          , ( "source_page", encodeInt rec.source_page )
          , ( "nv_carbohydrates", encodeFloat rec.nv_carbohydrates )
          , ( "nv_energy", encodeFloat rec.nv_energy )
          , ( "nv_fat", encodeFloat rec.nv_fat )
          , ( "nv_protein", encodeFloat rec.nv_protein )
          , ( "source", case rec.source of
            Just val -> sourceEncoder val
            Nothing -> Encode.null )
          , ( "ingredients", Encode.list ingreEncoder rec.ingredients )
          , ( "tags", Encode.list tagEncoder rec.tags )
          , ( "todos", Encode.list todoEncoder rec.todos )
          , ( "uuid", Encode.string rec.uuid )
          ]
    in
      Encode.object list

todoEncoder: O.Todo -> Encode.Value
todoEncoder td =
    Encode.object [ ( "id", encodeInt td.id )
    , ( "number", Encode.int td.number )
    , ( "text", Encode.string td.text )
    , ( "image", encodeString td.image )
    , ( "image_comment", encodeString td.image_comment )
    , ( "uuid", Encode.string td.uuid )
    ]

tagEncoder: O.Tag -> Encode.Value
tagEncoder tag =
    let
      list =
          [ ( "id", encodeInt tag.id )
          , ( "name", Encode.string tag.name )
          , ( "tagtype", tagtypeEncoder tag.tagType )
          , ( "uuid", Encode.string tag.uuid )
          ]
    in
      Encode.object list

tagtypeEncoder: O.TagtypeShort -> Encode.Value
tagtypeEncoder tt =
    Encode.object [ ( "id", encodeInt tt.id )
    , ( "name", Encode.string tt.name )
    , ( "uuid", Encode.string tt.uuid )
    ]

ingreEncoder: O.Ingredient -> Encode.Value
ingreEncoder ingre =
    let
      list =
          [ ( "id", encodeInt ingre.id )
          , ( "name", Encode.string ingre.name )
          , ( "sortorder", Encode.int ingre.sortorder )
          , ( "comment", encodeString ingre.comment )
          , ( "part", case ingre.part of
            Just val -> partLightEncoder val
            Nothing -> Encode.null )
          , ( "quantity", encodeFloat ingre.quantity )
          , ( "unit", case ingre.unit of
            Just val -> unitEncoder val
            Nothing -> Encode.null )
          , ( "uuid", Encode.string ingre.uuid )
          ]
    in
      Encode.object list

partEncoder: O.Part -> Encode.Value
partEncoder p =
    Encode.object [ ( "id", Encode.int p.id )
    , ( "name", Encode.string p.name )
    , ( "ingredients", Encode.list ingreEncoder p.ingredients)
    , ( "uuid", Encode.string p.uuid )
    ]

partLightEncoder: O.PartLight -> Encode.Value
partLightEncoder p =
    Encode.object [ ( "id", Encode.int p.id )
    , ( "name", Encode.string p.name )
    , ( "uuid", Encode.string p.uuid )
    ]

unitEncoder: O.Unit -> Encode.Value
unitEncoder unit =
    Encode.object [ ( "id", Encode.int unit.id )
    , ( "name", Encode.string unit.name )
    , ( "unitCategory", unitCatEncoder unit.unitCategory )
    , ( "uuid", Encode.string unit.uuid )
    ]

unitCatEncoder: O.UnitCategory -> Encode.Value
unitCatEncoder uc =
    let
      list =
          [ ( "id", Encode.int uc.id )
          , ( "name", Encode.string uc.name )
          , ( "uuid", Encode.string uc.uuid )
          ]
    in
      Encode.object list

sourceEncoder : O.Source -> Encode.Value
sourceEncoder src =
    let
      list =
          [ ( "id", encodeInt src.id )
          , ( "name", Encode.string src.name )
          , ( "isbn", encodeString src.isbn )
          , ( "year", encodeString src.year )
          , ( "uuid", Encode.string src.uuid )
          ]
    in
      Encode.object list

addIncredientEncoder: Int -> O.Ingredient -> Encode.Value
addIncredientEncoder recipeId ingre =  Encode.object [
    ("recipeId", Encode.int recipeId)
    , ("ingredientDto", ingreEncoder ingre)
  ]

addTodoEncoder: Int -> O.Todo -> Encode.Value
addTodoEncoder recipeId todo =  Encode.object [
    ("recipeId", Encode.int recipeId)
    , ("todoDto", todoEncoder todo)
  ]

