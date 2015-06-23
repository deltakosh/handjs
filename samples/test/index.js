document.addEventListener("DOMContentLoaded", function () {
    togglePointerUpDown({ target: updown });
    updown.onclick = togglePointerUpDown;
    togglePointerMove({ target: move });
    move.onclick = togglePointerMove;
    togglePointerOverOut({ target: overout });
    overout.onclick = togglePointerOverOut;
    togglePointerEnterLeave({ target: enterleave });
    enterleave.onclick = togglePointerEnterLeave;
    togglePointerCancel({ target: cancel });
    cancel.onclick = togglePointerCancel;

    clear.onclick = clearLog;
});

function logText(text) {
    var br = document.createElement("br");
    log.insertBefore(br, log.firstChild);
    log.insertBefore(document.createTextNode(text), br);
}
function eventLogger(e) {
    logText([e.type, e.pointerId, e.target.tagName, e.target.id, e.pointerType,
             e.currentTarget ? ["currentTarget: [", e.currentTarget.tagName, e.currentTarget.id, "]"].join(' ') : "",
             e.relatedTarget ? ["relatedTarget: [", e.relatedTarget.tagName, e.relatedTarget.id, "]"].join(' ') : "",
             e.clientX, e.clientY, e.button, e.buttons, e.pressure, e.width, e.height, window.performance ? performance.now().toFixed(3) : ""].join(' '));
}
function clearLog() {
    while (log.firstChild)
        log.removeChild(log.firstChild);
}

function togglePointerUpDown(e) {
    var isEnabling = e.target.checked;
    //toggleEvent(window, "pointerdown", isEnabling);
    //toggleEvent(window, "pointerup", isEnabling);
    toggleEvent(div1, "pointerdown", isEnabling);
    toggleEvent(div1, "pointerup", isEnabling);
    toggleEvent(div2, "pointerdown", isEnabling);
    toggleEvent(div2, "pointerup", isEnabling);
    toggleEvent(div3, "pointerdown", isEnabling);
    toggleEvent(div3, "pointerup", isEnabling);
}
function togglePointerMove(e) {
    var isEnabling = e.target.checked;
    toggleEvent(div1, "pointermove", isEnabling);
    toggleEvent(div2, "pointermove", isEnabling);
    toggleEvent(div3, "pointermove", isEnabling);
}
function togglePointerOverOut(e) {
    var isEnabling = e.target.checked;
    toggleEvent(div1, "pointerover", isEnabling);
    toggleEvent(div1, "pointerout", isEnabling);
    toggleEvent(div2, "pointerover", isEnabling);
    toggleEvent(div2, "pointerout", isEnabling);
    toggleEvent(div3, "pointerover", isEnabling);
    toggleEvent(div3, "pointerout", isEnabling);
}
function togglePointerEnterLeave(e) {
    var isEnabling = e.target.checked;
    toggleEvent(div1, "pointerenter", isEnabling);
    toggleEvent(div1, "pointerleave", isEnabling);
    toggleEvent(div2, "pointerenter", isEnabling);
    toggleEvent(div2, "pointerleave", isEnabling);
    toggleEvent(div3, "pointerenter", isEnabling);
    toggleEvent(div3, "pointerleave", isEnabling);
}
function togglePointerCancel(e) {
    var isEnabling = e.target.checked;
    toggleEvent(div1, "pointercancel", isEnabling);
    toggleEvent(div2, "pointercancel", isEnabling);
    toggleEvent(div3, "pointercancel", isEnabling);
}
function addEvent(object, name) {
    return object.addEventListener(name, eventLogger);
}
function removeEvent(object, name) {
    return object.removeEventListener(name, eventLogger);
}
function toggleEvent(object, name, isEnabling) {
    if (isEnabling)
        addEvent(object, name);
    else
        removeEvent(object, name);
}