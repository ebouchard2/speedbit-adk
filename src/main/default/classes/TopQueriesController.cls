public with sharing class TopQueriesController {
    @AuraEnabled
    public static String generateToken(String searchHub) {
        Map<String, Object> tokenParams = new Map<String, Object>();
        tokenParams.put('searchHub', searchHub);
        return CoveoV2.Globals.generateSearchToken(tokenParams);
    }
}