'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/guides/routing
|
*/

const Route = use('Route')

// User

Route.group(() => {
  Route.resource('users', 'UserController').apiOnly()
  Route.put('change-password', 'UserController.changePassword')
  Route.get('sponsor-achivements/:id', 'UserController.sponsorAchievements')
  Route.get('valuer-achivements/:id', 'UserController.valuerAchivements')
  Route.get('responsible-units/:id', 'UserController.unitAchievements')
  Route.post('per-practice', 'EvidenceController.perPractice')
  Route.post('res-practice', 'ResultController.perPractice')
  Route.get('unit-id/:id', 'TeamController.byUnitId')
  Route.resource('achievements', 'AchievementController').apiOnly()
  Route.resource('units', 'UnitController').apiOnly()
  Route.resource('evaluations', 'EvaluationController').apiOnly()
  Route.resource('evidences-font', 'EvidenceFontController').apiOnly()
  Route.resource('evidences', 'EvidenceController').apiOnly()
  Route.resource('profiles', 'ProfileController').apiOnly()
  Route.resource('results', 'ResultController').apiOnly()
  Route.resource('improvements', 'ImprovementController').apiOnly()
  Route.get('me', 'UserController.me').middleware('auth')
  Route.get('roles', 'UserProfileController.index')
  Route.post('roles', 'UserProfileController.store')
  Route.post('login', 'SessionController.login')
  Route.post('logout', 'SessionController.logout')
  Route.get('ids', 'UserController.ids')
  Route.get('evidences', 'EvidenceController')
  Route.get('per-unit/:id', 'EvaluationController.unitId')
  Route.get('teams', 'TeamController.index')
  Route.get('user-team/:id', 'TeamController.byUserId')
  Route.get('evidence-unit/:id', 'EvidenceFontController.byUnitId')
  Route.resource('member-role', 'MemberRoleController')
  Route.get('per-result/:id', 'ImprovementController.perResult')
  Route.post('sponsor-confirm/:id', 'EvaluationController.sponsorConfirm')
  Route.post('responsible-confirm/:id', 'EvaluationController.responsibleConfirm')
  Route.post('valuer-confirm/:id', 'EvaluationController.valuerConfirm')
  Route.resource('member-evaluation', 'MemberEvaluationController')
  Route.get('evaluation-result/:id', 'ResultController.byEvaluationId')
  Route.post('exist-member', 'MemberEvaluationController.existMember')
  Route.get('get-members/:id', 'MemberEvaluationController.getMembers')
  Route.post('member-confirm/:id', 'MemberEvaluationController.memberConfirm')
})
  .formats(['json'])
  .prefix('api')

Route.any('*', 'NuxtController.render')
