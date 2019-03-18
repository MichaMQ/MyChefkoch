module Devs.RecipeDecode exposing ( sourceEncoder,recipeEncoder,imageEncoder,tagtypeDecoder,recipeLightDecoder,recipeDecoder,unitDecoder,sourceDecoder,tagDecoder,partLightDecoder )

import Json.Decode as Decode exposing (Decoder, field, succeed)
import Json.Decode.Extra exposing (andMap)
import Json.Encode as Encode exposing (..)
--import Json.Encode.Extra as JsonE exposing (..)

import Devs.Objects as Objects exposing (..)

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

imageEncoder: ImagePortData -> Encode.Value
imageEncoder img = Encode.object [ ( "contents", Encode.string img.contents )
  , ( "filename", Encode.string img.filename )
  ]

recipeEncoder: Recipe -> Encode.Value
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
          , ( "ingredients", case rec.ingredients of
            Just list1 -> Encode.list ingreEncoder list1
            Nothing -> Encode.null )
          , ( "tags", case rec.tags of
            Just list2 -> Encode.list tagEncoder list2
            Nothing -> Encode.null )
          , ( "todos", case rec.todos of
            Just list3 -> Encode.list todoEncoder list3
            Nothing -> Encode.null )
          ]
    in
      Encode.object list

todoEncoder: Todo -> Encode.Value
todoEncoder td =
    Encode.object [ ( "id", Encode.int td.id )
    , ( "number", Encode.int td.number )
    , ( "text", Encode.string td.text )
    , ( "image", encodeString td.image )
    , ( "image_comment", encodeString td.image_comment )
    ]

tagEncoder: Tag -> Encode.Value
tagEncoder tag =
    let
      list =
          [ ( "id", encodeInt tag.id )
          , ( "name", Encode.string tag.name )
          , ( "tagtype", tagtypeEncoder tag.tagType )
          ]
    in
      Encode.object list

tagtypeEncoder: TagtypeShort -> Encode.Value
tagtypeEncoder tt =
    Encode.object [ ( "id", encodeInt tt.id )
    , ( "name", Encode.string tt.name )
    ]

ingreEncoder: Ingredient -> Encode.Value
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
          ]
    in
      Encode.object list

partEncoder: Part -> Encode.Value
partEncoder p =
    Encode.object [ ( "id", Encode.int p.id )
    , ( "name", Encode.string p.name )
    , ( "ingredients", Encode.list ingreEncoder p.ingredients)
    ]

partLightEncoder: PartLight -> Encode.Value
partLightEncoder p =
    Encode.object [ ( "id", Encode.int p.id )
    , ( "name", Encode.string p.name )
    ]

unitEncoder: Unit -> Encode.Value
unitEncoder unit =
    Encode.object [ ( "id", Encode.int unit.id )
    , ( "name", Encode.string unit.name )
    , ( "unitCategory", unitCatEncoder unit.unitCategory )
    ]

unitCatEncoder: UnitCategory -> Encode.Value
unitCatEncoder uc =
    let
      list =
          [ ( "id", Encode.int uc.id )
          , ( "name", Encode.string uc.name )
          ]
    in
      Encode.object list

sourceEncoder : Source -> Encode.Value
sourceEncoder src =
    let
      list =
          [ ( "id", encodeInt src.id )
          , ( "name", Encode.string src.name )
          , ( "isbn", encodeString src.isbn )
          , ( "year", encodeString src.year )
          ]
    in
      Encode.object list

tagtypeShortDecoder : Decoder TagtypeShort
tagtypeShortDecoder = Decode.map2 TagtypeShort
  (Decode.maybe <| field "id" Decode.int)
  (field "name" Decode.string)

tagDecoder : Decoder Tag
tagDecoder = Decode.map3 Tag
  (Decode.maybe <| field "id" Decode.int)
  (field "name" Decode.string)
  (field "tagtype" tagtypeShortDecoder)

tagListDecoder : Decoder (List Tag)
tagListDecoder =
  Decode.list tagDecoder

tagtypeDecoder : Decoder Tagtype
tagtypeDecoder =
  Decode.map3 Tagtype
    (field "id" Decode.int)
    (field "name" Decode.string)
    (field "tagList" tagListDecoder)

ingrDecoder : Decoder Ingredient
ingrDecoder = Decode.map7 Ingredient
  (Decode.maybe <| field "id" Decode.int)
  (field "name" Decode.string)
  (Decode.maybe <| field "comment" Decode.string)
  (Decode.maybe <| field "part" partLightDecoder)
  (Decode.maybe <| field "quantity" Decode.float)
  (field "sortorder" Decode.int)
  (Decode.maybe <| field "unit" unitDecoder)

ingrListDecoder : Decoder (List Ingredient)
ingrListDecoder =
  Decode.list ingrDecoder

partListDecoder : Decoder (List Part)
partListDecoder =
  Decode.list partDecoder

partDecoder : Decoder Part
partDecoder =
  Decode.map3 Part
    (field "id" Decode.int)
    (field "name" Decode.string)
    (field "ingredients" ingrListDecoder)

partLightDecoder : Decoder PartLight
partLightDecoder =
  Decode.map2 PartLight
    (field "id" Decode.int)
    (field "name" Decode.string)

unitDecoder : Decoder Unit
unitDecoder = Decode.map3 Unit
  (field "id" Decode.int)
  (field "name" Decode.string)
  (field "unitCategory" unitCategoryDecoder)

unitCategoryDecoder : Decoder UnitCategory
unitCategoryDecoder = Decode.map2 UnitCategory
  (field "id" Decode.int)
  (field "name" Decode.string)

sourceDecoder : Decoder Source
sourceDecoder = Decode.map4 Source
  (Decode.maybe <| field "id" Decode.int)
  (Decode.maybe <| field "isbn" Decode.string)
  (field "name" Decode.string)
  (Decode.maybe <| field "year" Decode.string)

todoDecoder : Decoder Todo
todoDecoder = Decode.map5 Todo
  (field "id" Decode.int)
  (Decode.maybe <| field "image" Decode.string)
  (Decode.maybe <| field "image_comment" Decode.string)
  (field "number" Decode.int)
  (field "text" Decode.string)

todoListDecoder : Decoder (List Todo)
todoListDecoder = Decode.list todoDecoder

recipeLightDecoder : Decoder RecipeLight
recipeLightDecoder = Decode.map2 RecipeLight
  (field "id" Decode.int)
  (field "name" Decode.string)

recipeDecoder : Decode.Decoder Recipe
recipeDecoder =
    Decode.succeed Recipe
    |> andMap (Decode.field "aikz" Decode.int)
    |> andMap (Decode.field "id" (Decode.maybe Decode.int))
    |> andMap (Decode.field "image" (Decode.maybe Decode.string))
    |> andMap (Decode.field "ingredients" (Decode.maybe ingrListDecoder))
    |> andMap (Decode.field "parts" (Decode.maybe partListDecoder))
    |> andMap (Decode.field "name" Decode.string)
    |> andMap (Decode.field "translate" (Decode.maybe Decode.string))
    |> andMap (Decode.field "number" (Decode.maybe Decode.int))
    |> andMap (Decode.field "number_comment" (Decode.maybe Decode.string))
    |> andMap (Decode.field "nv_carbohydrates" (Decode.maybe Decode.float))
    |> andMap (Decode.field "nv_energy" (Decode.maybe Decode.float))
    |> andMap (Decode.field "nv_fat" (Decode.maybe Decode.float))
    |> andMap (Decode.field "nv_protein" (Decode.maybe Decode.float))
    |> andMap (Decode.field "nv_size" (Decode.maybe Decode.int))
    |> andMap (Decode.field "source" (Decode.maybe sourceDecoder))
    |> andMap (Decode.field "source_page" (Decode.maybe Decode.int))
    |> andMap (Decode.field "tags" (Decode.maybe tagListDecoder))
    |> andMap (Decode.field "todos" (Decode.maybe todoListDecoder))
