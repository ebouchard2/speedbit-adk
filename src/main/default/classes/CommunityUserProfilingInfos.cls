public with sharing class CommunityUserProfilingInfos {

    @AuraEnabled(cacheable=true)
    public static string getUserProfilingInfos(){

        List<Map<String,Object>> userInfos = new List<Map<String,Object>>();
        userInfos.add(new Map<String,Object>{ 'field' => 'Interests', 'value' => 'Mountain Biking'});
        userInfos.add(new Map<String,Object>{ 'field' => 'Products Owned', 'value' => ''});
        userInfos.add(new Map<String,Object>{ 'field' => 'Registered on', 'value' => ''});

        return JSON.serialize(userInfos);
    }
}