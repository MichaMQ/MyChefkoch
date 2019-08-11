module Pages.OverViewPage exposing(viewOverview)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick, onInput)
import Devs.Objects as Objects exposing (..)
import Devs.TypeObject as TO exposing (Msg)
--import Debug exposing (log)

--import Recipe as RecipeObj

import Pages.LoginView as LW exposing (getLoginForm)
import Pages.EditorView as EW exposing (viewEditForm, viewSourceForm, viewAddTagForm)
import Pages.RecipeView as RW exposing (viewRecipe)
import Pages.RecipeListView as RLW exposing (viewRecipesOfTag)
import Pages.TagtypeView as TtW exposing (viewInitialTagtypeList)
import Pages.Utils as Utils exposing (getConfirmForm, onEnter)

-- View
viewOverview: Model -> Html Msg -> Html Msg
viewOverview model alertMsg =
  let
    content = case model.selectedRecipe of
      Just rec -> RW.viewRecipe model.loginToken rec model.sp
      Nothing -> case model.recipesOfSelectedTag of
        Just recipeList -> RLW.viewRecipesOfTag model
        Nothing -> TtW.viewInitialTagtypeList model
    editForm = case model.showEditForm of
      Just rec -> EW.viewEditForm model
      Nothing -> Html.text ""
    sourceForm = case model.newSource of
      Just src -> EW.viewSourceForm model
      Nothing -> Html.text ""
    tagForm = case model.addTag of
      Just tag -> EW.viewAddTagForm model
      Nothing -> Html.text ""
    loginForm = case model.loginToken of
      Just isLoggedInTmp -> if String.length isLoggedInTmp == 0
        then LW.getLoginForm model
        else Html.text ""
      Nothing -> Html.text ""
    confirmDeleteForm = if model.deleteRecipe
      then Utils.getConfirmForm TO.DeleteRecipe TO.CancelDelete "Soll das Rezept wirklich gelöscht werden?" model
      else Html.text ""
    isLoggedIn = case model.loginToken of
      Just log -> if String.length log > 0
        then True
        else False
      Nothing -> False
    actionButton = if isLoggedIn == True
      then Html.button [ onClick TO.InsertRecipe ][ Html.text "hinzufügen" ]
      else Html.button [ class "loginBtn", onClick TO.GetLoginForm ][ Html.text "einloggen" ]
    printBookLink = model.sp.serverProtokoll ++ model.sp.serverHost ++ model.sp.serverUrlPrefix ++ model.sp.apiUrlPrefix ++ "/printBookDownload"
  in
    Html.div[][
      sourceForm, tagForm, editForm, loginForm, confirmDeleteForm,
      Html.h1 [class "noprint"][ Html.text "Meine Rezeptesammlung" ],
      Html.div [ id "searchDiv", class "noprint"][
        Html.div [ id "searchForm" ][
          Html.input [
            type_ "text",
            name "searchField",
            class "searchField",
            placeholder "Welches Rezept suchst du?",
            value model.searchValue,
            onInput TO.SetSearchInput,
            Utils.onEnter TO.SearchRecipe
          ][],
          Html.button [
            name "searchButton",
            value "search",
            onClick TO.SearchRecipe
          ][ Html.text "suche" ],
          actionButton,
          Html.a [ href printBookLink ] [ Html.text "Buch drucken" ]
--          Html.button [ onClick PrintBook ][ Html.text "Buch drucken" ]
        ]
      ], alertMsg,
      content
    ]
