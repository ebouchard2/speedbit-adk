window.coveoCustomScripts['default'] = function(promise) {

  let showQuestionAnswer = false;
  // QUESTION ANSWERING HACK
  window.questionAnswering = () => {
    showQuestionAnswer = true;
  }
  const coveoRoot = document.querySelector('#search');
  const ANSWER_URI_HASH = 'ZKoJzryqñ9QlKPlh';
  if (coveoRoot) {
    Coveo.$$(document.querySelector('#search')).on(Coveo.QueryEvents.deferredQuerySuccess, (e,args) => {
      if (showQuestionAnswer) {
        const results = args.results.results;
        const foundIndex = results.findIndex(result => result.raw.urihash === ANSWER_URI_HASH);
        if (foundIndex != -1) {
          const result = document.querySelectorAll('.CoveoResult')[foundIndex];
          result.querySelector('.coveo-result-frame').innerHTML = `<div class="related-question-pair" style="padding: 20px; border: 1px solid grey; border-radius: 4px;margin-left:-16px;">    <div role="tabpanel" style="max-height: 208px;display:inline-block">        <div style="clear:none"> <span>${results[foundIndex].raw.sfprocedurec}</span></div>    </div>    <div>        <h3> <a href="${results[foundIndex].raw.clickableuri}" style="text-decoration:none;">                <div style="font-size: 16px;margin-top: 10px;">${results[foundIndex].title}</div>            </a> </h3>        <div class="TbwUpd" style="color:#006621;"> <cite>${results[foundIndex].raw.objecttypename} > ${results[foundIndex].raw.sfurlname}</cite> </div>    </div></div>`;
        }
      }
    });
  }

  var SpeedbitRecommendedBadge = (function(_super) {
    function SpeedbitRecommendedBadge(element, options, bindings, result) {
      this.type = 'SpeedbitRecommendedBadge';
      Coveo.Component.bindComponentToElement(element, this);
      this.element = element;
      this.options = options;
      this.bindings = bindings;
      this.result = result;

      this.render();
    }

    SpeedbitRecommendedBadge.prototype.render = function() {
      if(this.result.isRecommendation || this.result.isTopResult) {
        const myBadge = document.createElement('div');
        myBadge.classList.add('bg-orange', 'recommended', 'result-badge');
        myBadge.textContent = 'Recommended';
        this.element.appendChild(myBadge);
      }
    }

    SpeedbitRecommendedBadge.ID = 'SpeedbitRecommendedBadge';
    Coveo.Initialization.registerAutoCreateComponent(SpeedbitRecommendedBadge);
  })(Coveo.Component);
}